from django.contrib.auth import views as auth_views
from . import forms


class LoginView(auth_views.LoginView):
    form_class = forms.LoginForm
    redirect_authenticated_user = True

    def form_valid(self, form):
        if not form.cleaned_data['remember_me']:
            self.request.session.set_expiry(0)
            self.request.session.modified = True
        return super().form_valid(form)
