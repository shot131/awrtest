from django.contrib.auth import forms as auth_forms
from django import forms
from django.utils import timezone
from .models import LoginCount


class LoginForm(auth_forms.AuthenticationForm):
    remember_me = forms.BooleanField(initial=False, required=False, widget=forms.CheckboxInput())

    def clean(self):
        self.brutforce_protect()
        super().clean()
        return self.cleaned_data

    def brutforce_protect(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')
        if username and password:
            login_count = LoginCount.objects.filter(username=username).first()
            if not login_count:
                login_count = LoginCount(username=username)
                login_count.save()

            if login_count.count >= 10:
                delta = timezone.timedelta(hours=1)
                blocked_until = timezone.datetime.now() + delta
                if not login_count.blocked_until:
                    login_count.blocked_until = blocked_until
                    login_count.save()
                blocked_time = (timezone.datetime.now() - delta).timestamp()
                if login_count.blocked_until.timestamp() - blocked_time > 0:
                    raise forms.ValidationError(
                        'Вход для этого пользователя временно заблокирован. Пожалуйста, Попробуйте немного позже.',
                        code='max_login_attempts',
                    )
                else:
                    login_count.count = 0
                    login_count.blocked_until = None
                    login_count.save()

            if login_count:
                login_count.count += 1
                login_count.save()