import datetime

from django.utils.timezone import utc

from .models import Quiz, Question
from django.forms import ModelForm, TextInput, DateTimeInput, Textarea, BooleanField, forms, RadioSelect, \
    ModelChoiceField


class CreateQuestion(ModelForm):
    class Meta:
        model = Question
        fields = ['text','type','var1','var2','var3']

        widgets = {
            "text": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Текст вопроса'
            }),
            "var1": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Вариант ответа1'
            }),
            "var2": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Вариант ответа1'
            }),
            "var3": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Вариант ответа1'
            })
        }

class CreateQuiz(ModelForm):

    is_Active = BooleanField(required=True)
    q1 = ModelChoiceField(
        required=True,
        queryset=Question.objects.all()
    )
    q2 = ModelChoiceField(
        required=True,
        queryset=Question.objects.all()
    )
    q3 = ModelChoiceField(
        required=True,
        queryset=Question.objects.all()
    )
    date_start = datetime.datetime.now(utc)
    class Meta:
        model = Quiz
        fields = ['title','date_end','description',
                  'is_active', 'q1','q2','q3']

        widgets = {
            "title": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Название опроса'
            }),
            "is_Active": BooleanField(),
            "date_end": DateTimeInput(attrs={
                'class': 'form-control',
                'placeholder': 'Дата конца',
                'type': 'date'
            }),
            "description": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Описание'
            })
        }