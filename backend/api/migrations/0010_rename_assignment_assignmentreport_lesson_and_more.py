# Generated by Django 4.2.7 on 2024-01-07 02:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_assignmentreport_delete_assignment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='assignmentreport',
            old_name='assignment',
            new_name='lesson',
        ),
        migrations.AlterField(
            model_name='assignmentreport',
            name='date',
            field=models.CharField(max_length=255),
        ),
    ]