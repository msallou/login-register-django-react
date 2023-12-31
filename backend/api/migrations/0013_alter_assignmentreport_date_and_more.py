# Generated by Django 4.2.7 on 2024-01-07 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_assignmentreport_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignmentreport',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='assignmentreport',
            name='score',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='notification',
            name='isRead',
            field=models.BooleanField(),
        ),
    ]
