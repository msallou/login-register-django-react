from django.contrib import admin
from api.models import User, Notification, AssignmentReport

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name', 'email']



admin.site.register(User, UserAdmin)
admin.site.register(Notification)
admin.site.register(AssignmentReport)