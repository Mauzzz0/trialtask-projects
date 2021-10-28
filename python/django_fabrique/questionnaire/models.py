from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin


class Question(models.Model):
    """Вопрос"""
    text = models.TextField("Текст")
    type = models.CharField("Тип вопроса", max_length=24,
            choices=(
                ("Текстовый","Текстовый"),
                ("С 1 вариантом","С 1 вариантом"),
                ("С несколькими вариантами","С несколькими вариантами")
            ))

    var1 = models.CharField("Вариант ответа1",max_length=30,null=True)
    var2 = models.CharField("Вариант ответа2",max_length=30,null=True)
    var3 = models.CharField("Вариант ответа3",max_length=30,null=True)
    # Как-то грамотно можно сделать список с неопределённым количеством вариантов ответа
    # И его передавать в detail_view.html для вопросов с выбором ответа.


    def __str__(self):
        return self.text[:30]

    class Meta:
        verbose_name = "Вопрос"
        verbose_name_plural = "Вопросы"

class Quiz(models.Model):
    """Опрос"""
    title = models.CharField("Название", max_length=50)
    date_start = models.DateTimeField("Время начала",auto_now=True)
    date_end = models.DateTimeField("Время окончания")
    description = models.TextField("Описание")
    is_active=models.BooleanField("Активный",default=True)
    q1 = models.ForeignKey(
            Question,
            verbose_name="Вопрос 1",
            related_name="quiz_q1",
            on_delete=models.SET_NULL,
            null=True)
    q2 = models.ForeignKey(
        Question,
        verbose_name="Вопрос 2",
        related_name="quiz_q2",
        on_delete=models.SET_NULL,
        null=True)
    q3 = models.ForeignKey(
        Question,
        verbose_name="Вопрос 3",
        related_name="quiz_q3",
        on_delete=models.SET_NULL,
        null=True)
    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Опрос"
        verbose_name_plural = "Опросы"
        unique_together = (("q1", "q2"),("q1","q3"),("q2","q3"))

class CompletedQuiz(models.Model):
    """Законченный опрос"""
    user_id = models.ForeignKey(
        User,
        verbose_name="Пользователь, прошедший опрос",
        related_name="quiz_user",
        on_delete=models.CASCADE
    )
    quiz_id = models.ForeignKey(
        Quiz,
        verbose_name="Опрос",
        related_name="quiz",
        on_delete=models.SET_NULL,
        null=True
    )
    q1 = models.CharField("Вопрос1", max_length=255,blank=True)
    q2 = models.CharField("Вопрос2", max_length=255,blank=True)
    q3 = models.CharField("Вопрос3", max_length=255,blank=True)
    q1ans = models.CharField("Ответ на вопрос1",max_length=255,blank=True)
    q2ans = models.CharField("Ответ на вопрос2",max_length=255,blank=True)
    q3ans = models.CharField("Ответ на вопрос3",max_length=255,blank=True)

    def __str__(self):
        return self.user_id.username + self.quiz_id.title

    class Meta:
        verbose_name = "Законченный опрос"
        verbose_name_plural = "Законченные опросы"
        unique_together = (("user_id","quiz_id"),)