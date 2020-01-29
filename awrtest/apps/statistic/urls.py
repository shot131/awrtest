from django.urls import path
from . import views

urlpatterns = [
    path('', views.Statistic.as_view(), name='statistic'),
]