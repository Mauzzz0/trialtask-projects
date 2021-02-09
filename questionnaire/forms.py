from .models import Quiz, Question
from django.forms import ModelForm, TextInput, DateTimeInput, Textarea

class QuizForm(ModelForm):
    class Meta:
        model = Quiz
        fields = ['title','date_start','date_end','description']


