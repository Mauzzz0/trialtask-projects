# Generated by Django 2.2.10 on 2021-02-09 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questionnaire', '0005_auto_20210209_1601'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='Активный'),
        ),
    ]
