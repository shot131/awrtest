from django.urls import path
from . import views

urlpatterns = [
    path('', views.UsersList.as_view(), name='list'),
    path('edit/<int:pk>/', views.UserUpdate.as_view(), name='edit'),
    path('delete/<int:pk>/', views.UserDelete.as_view(), name='delete'),
    path('create/', views.UserCreate.as_view(), name='create'),
]