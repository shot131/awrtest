from django import forms
from django.contrib.auth.models import User


class UserUpdateForm(forms.ModelForm):
    username = forms.CharField(widget=forms.TextInput(), required=True)
    password = forms.CharField(widget=forms.PasswordInput(), required=True)
    password_confirm = forms.CharField(widget=forms.PasswordInput(), required=True)

    class Meta:
        model = User
        fields = ('username', 'password')

    def clean(self):
        cleaned_data = self.cleaned_data
        if cleaned_data['password'] != cleaned_data['password_confirm']:
            self.add_error('password_confirm', 'Пароли не совпадают')
        return super().clean()

    def save(self, commit=True):
        instance = super().save(commit)
        instance.set_password(self.cleaned_data['password'])
        if commit:
            instance.save()
        return instance
