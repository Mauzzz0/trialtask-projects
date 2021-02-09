from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home, name="home"),
    path('<int:pk>', views.QuizDetailView1.as_view(),name="quiz_detail"),
    path('logout',views.LogoutFormView.as_view()),
    path('login',views.LoginFormView.as_view())
]