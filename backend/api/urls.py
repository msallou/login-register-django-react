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
    path('check-email/<str:email>/', views.check_email_availability),
    path('check-username-exists/<str:username>/', views.check_username_exists),


    path('notifications/<int:user_id>/', views.NotificationsView.as_view()),
]