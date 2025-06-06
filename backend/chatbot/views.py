from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.

class ChatbotViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def ask(self, request):
        """
        Endpoint to handle patient questions and return AI-generated responses
        """
        question = request.data.get('question', '')
        
        # TODO: Integrate with actual AI model
        # For now, return a mock response
        response = {
            'question': question,
            'answer': 'This is a sample AI-generated response. In a production environment, this would be connected to an actual AI model.',
            'confidence': 0.95
        }
        
        return Response(response)
