from django.urls import path
from . import views

urlpatterns = [
    path('random_allocation/', views.random_allocation),
]