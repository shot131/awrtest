from django.views.decorators.csrf import csrf_exempt
from django.urls import path
from . import views

urlpatterns = [
    path('message/create/', csrf_exempt(views.AddMessage.as_view()), name='create'),
]