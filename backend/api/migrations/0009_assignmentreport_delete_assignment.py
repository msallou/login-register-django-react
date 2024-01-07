# Generated by Django 4.2.7 on 2024-01-06 23:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_assignment_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='AssignmentReport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('unit', models.CharField(max_length=255)),
                ('assignment', models.CharField(max_length=255)),
                ('grade', models.IntegerField()),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Assignment',
        ),
    ]
