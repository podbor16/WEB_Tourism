from django.urls import path
from . import views

app_name = 'tours_registrations'

urlpatterns = [
    path('register/<int:tour_id>/', views.register_for_tour, name='register_for_tour'),
    path('my-registrations/', views.my_registrations, name='my_registrations'),
    path('cancel/<int:reg_id>/', views.cancel_registration, name='cancel_registration'),
    path('reactivate/<int:reg_id>/', views.reactivate_registration, name='reactivate_registration'),  # ← новая строка
]