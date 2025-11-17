from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import RegistrationForm, LoginForm
from .forms import ProfileEditForm, UserEditForm


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
    # Полная очистка всех сообщений
    storage = messages.get_messages(request)
    storage.used = True  # ← ключевая строка!

    return render(request, "account/profile.html", {"user": request.user})

def signup(request):
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Регистрация прошла успешно!")
            return redirect("account:login")
        else:
            print("Ошибки формы:", form.errors)  # ← ошибки будут в консоли
            messages.error(request, "Исправьте ошибки в форме")
    else:
        form = RegistrationForm()
    return render(request, "account/signup.html", {"form": form})

@login_required
def edit_profile(request):
    if request.method == 'POST':
        user_form = UserEditForm(request.POST, instance=request.user)
        profile_form = ProfileEditForm(request.POST, instance=request.user.profile)

        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, "Профиль успешно обновлён.")
            return redirect('account:profile')
        else:
            messages.error(request, "Ошибка при сохранении. Проверьте данные.")

    else:
        user_form = UserEditForm(instance=request.user)
        profile_form = ProfileEditForm(instance=request.user.profile)

    context = {
        'user_form': user_form,
        'profile_form': profile_form,
    }
    return render(request,'account/edit_profile.html', context)
