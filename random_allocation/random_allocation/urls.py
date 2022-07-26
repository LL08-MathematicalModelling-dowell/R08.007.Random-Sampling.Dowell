from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('experimental_frontend.urls')),
    path('api/', include('random_allocation_api.urls')),
]