from django.contrib.auth import views as auth_views
from django.utils import timezone
from . import forms
from .models import LoginCount


class LoginView(auth_views.LoginView):
    form_class = forms.LoginForm
    redirect_authenticated_user = True

    def form_valid(self, form):
        login_count = LoginCount.objects.filter(username=form.cleaned_data['username']).first()
        if login_count:
            login_count.delete()
        if not form.cleaned_data['remember_me']:
            self.request.session.set_expiry(0)
            self.request.session.modified = True
        return super().form_valid(form)
