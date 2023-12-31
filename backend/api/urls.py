from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from api import views

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('profile/', views.UserProfileView.as_view()),
    path('dashboard/', views.dashboard),
    path('test/', views.testEndPoint),
    path('usernames/', views.RegisteredUsernamesView.as_view()),
    path('check-username/<str:username>/', views.check_username_availability),
]