from django.contrib import admin
from api.models import User#,Profile

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name', 'email']



admin.site.register(User, UserAdmin)
