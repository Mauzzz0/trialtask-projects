from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
import datetime
from django.contrib.auth.decorators import permission_required

from django.utils.timezone import utc
from django.views.generic import DetailView
from django.views.generic.edit import FormView
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.contrib.auth import logout
from .models import Quiz,CompletedQuiz
from .forms import CreateQuestion, CreateQuiz

def Home(request):
    quizzes = Quiz.objects.order_by('-date_start')
    for quiz in quizzes:
        if quiz.date_end < datetime.datetime.now(utc):
            print(quiz.date_end) # Просроченные опросы становятся inactive
            print(datetime.datetime.now(utc))
            quiz.is_Active = False
            quiz.save()

    return render(request, "homePage.html", {"quizzes" : quizzes})

def Answers(request):
    user_id = request.user.pk
    answers = CompletedQuiz.objects.filter(user_id=user_id)
    return render(request, "my_answers.html", {"answers" : answers})

@permission_required('add questions')
def create_question(request):
    error = ''
    form = CreateQuestion()
    if request.method == 'POST':
        form = CreateQuestion(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/")
        else:
            error = "Incorrect form"

    data = {
        'form' : form,
        'error' : error
    }

    return render(request,"create_question.html",data)

@permission_required('add quizzes')
def create_quiz(request):
    error = ''
    form = CreateQuiz()
    if request.method == 'POST':
        print(request.POST)
        form = CreateQuiz(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/")
        else:
            error = "Incorrect form"

    data = {
        'form' : form,
        'error' : error
    }

    return render(request,"create_quiz.html",data)


class QuizDetailView(DetailView):
    """Каждый опросник"""
    model = Quiz
    template_name = 'each_quiz.html'
    context_object_name = "quiz"

    def post(self,request,*args,**kwargs):
        self.object = self.get_object()
        q1ans = request.POST.get('q1ans')
        q2ans = request.POST.get('q2ans')
        q3ans = "".join(
            [x+" " for x in
            (
                    request.POST.get('q3ans1'),
                    request.POST.get('q3ans2'),
                    request.POST.get('q3ans3'))
                if x is not None]
            ) # Concatenation answers to one string

        CQ = CompletedQuiz(
            user_id_id=request.user.pk,
            quiz_id=self.object,
            q1 = self.object.q1,
            q2 = self.object.q2,
            q3 = self.object.q3,
            q1ans=q1ans,
            q2ans=q2ans,
            q3ans=q3ans
        )
        CQ.save()
        pass # TODO: Some response


class LogoutFormView(FormView):
    """Логаут"""
    def get(self,request):
        logout(request)
        return HttpResponseRedirect("/")

class LoginFormView(FormView):
    """Логин"""
    form_class = AuthenticationForm
    template_name = "login.html"
    success_url = "/"
    def form_valid(self, form):
        self.user = form.get_user()
        login(self.request,self.user)
        return super(LoginFormView,self).form_valid(form)
