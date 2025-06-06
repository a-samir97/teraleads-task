from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Patient
from .serializers import PatientSerializer

# Create your views here.

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Optionally restricts the returned patients to a given user,
        by filtering against a `user` query parameter in the URL.
        """
        queryset = Patient.objects.all()
        user_id = self.request.query_params.get('user', None)
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        return queryset

    @action(detail=True, methods=['get'])
    def medical_history(self, request, pk=None):
        patient = self.get_object()
        return Response({
            'medical_history': patient.medical_history,
            'allergies': patient.allergies
        })
