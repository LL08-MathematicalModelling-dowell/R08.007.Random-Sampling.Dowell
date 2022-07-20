from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('function_type/', views.function_type),
    path('random_point_allocation_input/', views.random_point_allocation_input)
]