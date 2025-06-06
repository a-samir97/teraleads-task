from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Patient

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    gender = serializers.ChoiceField(choices=Patient.GENDER_CHOICES)

    class Meta:
        model = Patient
        fields = ('id', 'user', 'date_of_birth', 'gender', 'phone_number', 
                 'address', 'medical_history', 'allergies', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user = UserSerializer().create(user_data)
            patient = Patient.objects.create(user=user, **validated_data)
        else:
            # If no user data provided, use the authenticated user
            user = self.context['request'].user
            patient = Patient.objects.create(user=user, **validated_data)
        return patient

    def update(self, instance, validated_data):
        if 'user' in validated_data:
            user_data = validated_data.pop('user')
            user = instance.user
            for attr, value in user_data.items():
                if attr == 'password':
                    user.set_password(value)
                else:
                    setattr(user, attr, value)
            user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance