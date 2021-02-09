from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views.generic import DetailView
from django.views.generic.edit import FormView
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.contrib.auth import logout
from .models import Quiz

def Home(request):
    quizzes = Quiz.objects.order_by('-date_start')
    return render(request, "homePage.html", {"quizzes" : quizzes})

#lass QuizDetailView(DetailView): # on detail_view.html
#   model = Quiz
#   template_name = 'detail_view.html'
#   context_object_name = "quiz"
#   questions = lambda x: x.object.question_quiz.all()

#   def post(self,request): # Unexpected 'pk'
#       if request.methond == 'POST':
#           print("AAAAAAAAAAAAAAAAAA")
#           pass

class QuizDetailView1(DetailView): # on each_quiz.html
    model = Quiz
    template_name = 'each_quiz.html'
    context_object_name = "quiz"
    questions = lambda x: x.object.question_quiz.all()
    def post(self,request,*args,**kwargs):
        q1ans = request.POST.get('q1ans')
        q2ans = request.POST.get('q2ans')
        q3ans = [x for x in (request.POST.get('q3ans1'),
                             request.POST.get('q3ans2'),
                             request.POST.get('q3ans3'))
                 if x != None]
        print(request.user.pk)
        pass


class LogoutFormView(FormView):
    def get(self,request):
        logout(request)
        return HttpResponseRedirect("/")

class LoginFormView(FormView):
    form_class = AuthenticationForm
    template_name = "login.html"
    success_url = "/"
    def form_valid(self, form):
        self.user = form.get_user()
        login(self.request,self.user)
        return super(LoginFormView,self).form_valid(form)
