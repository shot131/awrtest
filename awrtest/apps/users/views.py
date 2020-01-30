from django.contrib.auth.decorators import login_required, permission_required
from django.utils.decorators import method_decorator
from django.views.generic import ListView
from django.views.generic.edit import (UpdateView, DeleteView, CreateView)
from django.contrib.auth import models as auth_models
from django.urls import reverse_lazy
from .forms import UserUpdateForm
from django.contrib import messages

decorators = [permission_required((
    'auth.user.can_view_user',
    'auth.user.can_edit_user',
    'auth.user.can_delete_user',
), raise_exception=True)]


@method_decorator(decorators, name='dispatch')
class UsersList(ListView):
    model = auth_models.User
    template_name = 'users/list.html'
    context_object_name = 'users_list'
    queryset = auth_models.User.objects.filter(is_superuser=0)
    paginate_by = 10
    ordering = 'id'


@method_decorator(decorators, name='dispatch')
class UserUpdate(UpdateView):
    model = auth_models.User
    form_class = UserUpdateForm
    template_name = 'users/edit.html'

    def get_success_url(self):
        return reverse_lazy('users:edit', kwargs={'pk': self.object.pk})

    def form_valid(self, form):
        messages.success(self.request, 'Пользователь успешно сохранён.')
        return super().form_valid(form)


@method_decorator(decorators, name='dispatch')
class UserDelete(DeleteView):
    model = auth_models.User
    success_url = reverse_lazy('users:list')
    template_name = 'users/delete.html'

    def delete(self, request, *args, **kwargs):
        messages.success(self.request, 'Пользователь успешно удалён.')
        return super().delete(request, *args, **kwargs)


@method_decorator(decorators, name='dispatch')
class UserCreate(CreateView):
    model = auth_models.User
    form_class = UserUpdateForm
    template_name = 'users/create.html'

    def get_success_url(self):
        return reverse_lazy('users:edit', kwargs={'pk': self.object.pk})

    def form_valid(self, form):
        messages.success(self.request, 'Пользователь успешно создан.')
        return super().form_valid(form)
