from django.db import models
from django.contrib.auth.models import AbstractUser
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
    date_end = models.DateTimeField("Время окончания") # TODO: Autoending
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



#class UserManager(BaseUserManager):
#    """..."""
#    def _create_user(self, username, email, password=None):
#        if not username:
#            raise ValueError("Incorrect username")
#        if not email:
#            raise ValueError("Incorrect email")
#
#        #email = self.normalize_email(email)
#        #user = self.model(username=username,email=email)
#        #user.set_password(password)
#        #user.save(using=self._db)
#        return user
#
#class User(AbstractBaseUser, PermissionsMixin):
#    """Пользователь"""
#    username = models.CharField(max_length=50, unique=True)
#    email = models.EmailField(
#        validators=[validators.validate_email],
#        unique=True
#    )
#
#    #is_staff = models.BooleanField(default=False)
#    #is_active= models.BooleanField(default=True)
#
#    USERNAME_FIELD = 'email'
#    REQUIRED_FIELDS = ('username',)
#
#    objects = UserManager()
#
#    def __str__(self):
#        return self.username
#
#    @property
#    def token(self):
#        return self._generate_jwt_token()
#
#    def _generate_jwt_token(self):
#        dt = datetime.now() + timedelta(days=100)
#
#        token = jwt.encode({
#            'id' : self.pk,
#            'exp' : int(dt.strftime('%s'))
#        }, settings.SECRET_KEY, algorithm="HS256")
#
#        return token.decode('utf-8')

