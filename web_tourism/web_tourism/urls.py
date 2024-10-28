"""
URL configuration for web_tourism project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from tourism.views import start_page, media_page, about_project_page, medicine_page,header,equipment_page,walking_tourism__page, water_tourism__page,mountain_tourism__page

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', start_page),
    path('media/', media_page),
    path('about_project/', about_project_page),
    path('medicine/', medicine_page),
    path('header/', header),
    path('equipment/', equipment_page),
    path('walking_tourism/', walking_tourism__page),
    path('water_tourism/', water_tourism__page),
    path('mountain_tourism/', mountain_tourism__page)
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)