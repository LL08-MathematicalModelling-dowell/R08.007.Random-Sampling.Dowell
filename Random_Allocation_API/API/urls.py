from django.urls import path
from . import views

urlpatterns = [
    path('fieldrp/', views.FieldRP),
    path('excelrp/', views.ExcelRP),
    path('graph/', views.createGraph),
]