from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home, name="home"),
    path('<int:pk>', views.QuizDetailView.as_view(),name="quiz_detail"),
    path('my_answers',views.Answers,name="my_answers"),
    path('logout',views.LogoutFormView.as_view()),
    path('login',views.LoginFormView.as_view())
]