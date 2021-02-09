from .models import *
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin




admin.site.register(Question)
#admin.site.register(Quiz)

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    """Опрос"""
    list_display = ('title','date_start','date_end','description','is_active')
    readonly_fields = ['date_start']



