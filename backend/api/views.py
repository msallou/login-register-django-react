from django.shortcuts import render
from api.models import User#, Profile
from api.serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from django.http import JsonResponse
from django.views.decorators.http import require_GET



# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == 'GET':
        data = f"Hello {request.user}. You are seeing a GET response"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f"Hey {request.user}, your text is {text}"
        return Response({'response': data}, status=status.HTTP_200_OK)
    
    # if neither GET nor POST
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RegisteredUsernamesView(APIView):
    def get(self, request, format=None):
        # Retrieve all user objects from the database
        users = User.objects.all()

        # Serialize the usernames (adjust serializer as needed)
        serializer = UserSerializer(users, many=True)
        usernames = serializer.data

        return Response(usernames)
    
@require_GET
def check_username_availability(request, username):
    # Check if the username already exists in the database
    is_available = not User.objects.filter(username=username).exists()

    # Return the result as JSON
    return JsonResponse({'isAvailable': is_available})

@require_GET
def check_email_availability(request, email):
    # Check if the email already exists in the database
    is_available = not User.objects.filter(email=email).exists()

    # Return the result as JSON
    return JsonResponse({'isAvailable': is_available})

@require_GET
def check_username_exists(request, username):
    # Perform the check to see if the username exists
    exists = User.objects.filter(username=username).exists()
    return JsonResponse({'exists': exists})