from .models import *
from django.contrib import admin

admin.site.register(Question)
admin.site.register(CompletedQuiz)

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    """Опрос"""
    list_display = ('title','date_start','date_end','description','is_active')
    readonly_fields = ['date_start']



