from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import RegistrationForm, LoginForm


def register_view(request):
    """
    Регистрация нового пользователя + создание профиля.
    """
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # сразу авторизуем после регистрации
            messages.success(request, "Регистрация прошла успешно! Добро пожаловать.")
            return redirect("account:profile")
        else:
            messages.error(request, "Ошибка при регистрации. Проверьте введенные данные.")
    else:
        form = RegistrationForm()

    return render(request, "account/register.html", {"form": form})


def login_view(request):
    """
    Авторизация пользователя по email + паролю.
    """
    if request.method == "POST":
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            email = form.cleaned_data.get("username")  # в LoginForm username = email
            password = form.cleaned_data.get("password")
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f"Добро пожаловать, {user.first_name}!")
                return redirect("account:profile")
            else:
                messages.error(request, "Неверный email или пароль.")
        else:
            messages.error(request, "Ошибка входа. Проверьте данные.")
    else:
        form = LoginForm()

    return render(request, "account/login.html", {"form": form})


@login_required
def logout_view(request):
    """
    Выход из аккаунта.
    """
    logout(request)
    messages.info(request, "Вы вышли из системы.")
    return redirect("account:login")


@login_required
def profile_view(request):
    """
    Профиль пользователя.
    """
    return render(request, "account/profile.html", {"user": request.user})
