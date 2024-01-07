from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)

    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']

    def __str__(self):
        return self.username

class Notification(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    message = models.TextField()
    notified = models.DateTimeField(auto_now_add=True)
    isRead = models.BooleanField(False)

    def __str__(self):
        return f"{self.user}: {self.message}"
    
class AssignmentReport(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    # date = models.CharField(max_length=255)
    unit = models.CharField(max_length=255)
    lesson = models.CharField(max_length=255)
    grade = models.IntegerField()

    def __str__(self):
        return f"{self.user}: {self.grade}: {self.lesson}"