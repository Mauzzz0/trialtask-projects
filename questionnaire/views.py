from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views.generic import DetailView
from django.views.generic.edit import FormView
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.contrib.auth import logout
from .models import Quiz,CompletedQuiz

def Home(request):
    quizzes = Quiz.objects.order_by('-date_start')
    return render(request, "homePage.html", {"quizzes" : quizzes})

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
