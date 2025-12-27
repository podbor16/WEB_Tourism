from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.TourRegistrationViewSet, basename='registration')

app_name = 'tours_registrations'
urlpatterns = [
    path('', include(router.urls)),
]
