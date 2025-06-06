from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
import openai
from django.conf import settings

# Create your views here.

class ChatbotView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            question = request.data.get('question')
            if not question:
                return Response(
                    {'error': 'Question is required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Initialize OpenAI client
            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

            # Create a prompt template for dental context
            prompt = f"""As a dental assistant, please provide a helpful and professional response to the following question:
            {question}
            
            Keep the response concise, informative, and focused on dental health."""

            # Get response from OpenAI
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful dental assistant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=150
            )

            return Response({
                'response': response.choices[0].message.content
            })

        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
