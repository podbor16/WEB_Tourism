from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from tourism.views import start_page, media_page, about_project_page, medicine_page,header,equipment_page,walking_tourism__page, water_tourism__page,mountain_tourism__page,stolby_route_page,mansky_route_page,elbrus_route_page

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tours/', include('tours.urls')),
    path('registrations/', include('tours_registrations.urls')),  # <-- важно
    path('account/', include('account.urls')),
    path('', start_page),
    path('media/', media_page),
    path('about_project/', about_project_page),
    path('medicine/', medicine_page),
    path('header/', header),
    path('equipment/', equipment_page),
    path('walking_tourism/', walking_tourism__page),
    path('water_tourism/', water_tourism__page),
    path('mountain_tourism/', mountain_tourism__page),
    path('stolby_route/', stolby_route_page),
    path('elbrus_route/', elbrus_route_page),
    path('mansky_route/', mansky_route_page)
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)