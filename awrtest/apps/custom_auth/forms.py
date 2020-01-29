from django.contrib.auth import forms as auth_forms
from django import forms


class LoginForm(auth_forms.AuthenticationForm):
    remember_me = forms.BooleanField(initial=False, required=False, widget=forms.CheckboxInput())
