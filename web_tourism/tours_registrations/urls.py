from django.urls import path
from . import views

app_name = 'tours_registrations'

urlpatterns = [
    path('register/<int:tour_id>/', views.register_for_tour, name='register_for_tour'),
    path('my-registrations/', views.my_registrations, name='my_registrations'),
]