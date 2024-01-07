from django.shortcuts import render
from api.models import User#, Profile
from api.serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer, NotificationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, AssignmentSerializer
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import Notification, AssignmentReport





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


class NotificationsView(APIView):
    def get(self, request, user_id):
        notifications = Notification.objects.filter(user_id=user_id)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AssignmentList(APIView):
    def get(self, request, user_id):
        assignment_reports = AssignmentReport.objects.filter(user_id=user_id)
        serializer = AssignmentSerializer(assignment_reports, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateNotificationView(APIView):
    def post(self, request):
        # Assuming you pass user_id and message in the request data
        user_id = request.data.get('user_id')
        message = request.data.get('message')

        if user_id and message:
            Notification.objects.create(user_id=user_id, message=message, isRead=False)
            return Response({'message': 'Notification created successfully.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid data. Both user_id and message are required.'}, status=status.HTTP_400_BAD_REQUEST)

class CreateAssignmentView(APIView):
    def post(self, request):
        # Assuming you pass user_id and message in the request data
        user_id = request.data.get('user_id')
        date = request.data.get('date')
        grade = request.data.get('grade')
        unit = request.data.get('unit')
        lesson = request.data.get('lesson')
        completedStatus = request.data.get('completedStatus')
        score = request.data.get('score')

        if user_id and date and grade and unit and lesson and completedStatus:
            AssignmentReport.objects.create(user_id=user_id, date=date, grade=grade, unit=unit, lesson=lesson, completedStatus=completedStatus, score=score)
            return Response({'message': 'Assignment created successfully.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid data. user_id, grade, unit, and lesson are required.'}, status=status.HTTP_400_BAD_REQUEST)