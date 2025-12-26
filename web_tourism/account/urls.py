from django.urls import path
from . import views

app_name = "account"  

urlpatterns = [
    path('signup/', views.register_view, name='signup'),   # Регистрация
    path('login/', views.login_view, name='login'),       # Авторизация
    path('logout/', views.logout_view, name='logout'),    # Выход
    path('profile/', views.profile_view, name='profile'), # Личный кабинет
    path('profile/edit/', views.edit_profile, name='edit_profile'),
]
