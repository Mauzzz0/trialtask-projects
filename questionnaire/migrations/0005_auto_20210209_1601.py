# Generated by Django 2.2.10 on 2021-02-09 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questionnaire', '0004_auto_20210209_1601'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='date_end',
            field=models.DateTimeField(verbose_name='Время окончания'),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='date_start',
            field=models.DateTimeField(auto_now=True, verbose_name='Время начала'),
        ),
    ]
