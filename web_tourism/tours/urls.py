from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.TourViewSet, basename='tour')

app_name = 'tours'
urlpatterns = [
    path('', include(router.urls)),
]
