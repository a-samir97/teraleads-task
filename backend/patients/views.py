from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Patient
from .serializers import PatientSerializer

# Create your views here.

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Patient.objects.all()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                user__username__icontains=search
            ) | queryset.filter(
                user__first_name__icontains=search
            ) | queryset.filter(
                user__last_name__icontains=search
            )
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
