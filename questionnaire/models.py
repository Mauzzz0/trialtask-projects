from django.db import models

class Quiz(models.Model):
    """Опрос"""
    title = models.CharField("Название", max_length=50)
    date_start = models.DateTimeField("Время начала",auto_now=True) # TODO: readonly after start
    date_end = models.DateTimeField("Время окончания")
    description = models.TextField("Описание")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Опрос"
        verbose_name_plural = "Опросы"

class Question(models.Model):
    """Вопрос"""
    text = models.TextField("Текст")
    type = models.CharField("Тип вопроса", max_length=24,
            choices=(
                ("Текстовый","Текстовый"),
                ("С 1 вариантом","С 1 вариантом"),
                ("С несколькими вариантами","С несколькими вариантами")
            ))
    quiz = models.ForeignKey(
            Quiz,
            verbose_name="Опрос",
            on_delete=models.CASCADE,
            # Логично: удаление опроса приводит к удалению всех его вопросов
    )

    def __str__(self):
        return self.text[:30]

    class Meta:
        verbose_name = "Вопрос"
        verbose_name_plural = "Вопросы"