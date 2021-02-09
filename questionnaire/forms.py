from .models import Quiz, Question
from django.forms import ModelForm, TextInput, DateTimeInput, Textarea

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

