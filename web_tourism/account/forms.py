from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import CustomUser, Profile


class RegistrationForm(UserCreationForm):
    # Поля из профиля
    gender = forms.ChoiceField(
        choices=Profile.GENDER_CHOICES,
        required=False,
        label="Пол"
    )

    city = forms.CharField(
        max_length=100,
        required=False,
        label="Город",
        widget=forms.TextInput(attrs={
            "placeholder": "Например: Москва",
            "autocomplete": "address-level2"
        })
    )

    birth_date = forms.DateField(
        required=False,
        widget=forms.DateInput(
            attrs={
                "type": "date",
                "autocomplete": "bday"
            }
        ),
        label="Дата рождения"
    )

    phone_number = forms.CharField(
        max_length=10,
        required=False,
        widget=forms.TextInput(
            attrs={
                "placeholder": "9001234567",
                "pattern": r"^\d{10}$",
                "title": "Введите номер в формате: 9001234567 (10 цифр)",
                "autocomplete": "tel"
            }
        ),
        label="Телефон"
    )

    # Поля из CustomUser
    email = forms.EmailField(
        label="Электронная почта",
        widget=forms.EmailInput(attrs={
            "placeholder": "example@mail.ru",
            "autocomplete": "username"
        })
    )

    first_name = forms.CharField(
        max_length=50,
        label="Имя",
        widget=forms.TextInput(attrs={
            "placeholder": "Ваше имя",
            "autocomplete": "given-name"
        })
    )

    last_name = forms.CharField(
        max_length=50,
        label="Фамилия",
        widget=forms.TextInput(attrs={
            "placeholder": "Ваша фамилия",
            "autocomplete": "family-name"
        })
    )

    password1 = forms.CharField(
        label="Пароль",
        widget=forms.PasswordInput(attrs={
            "placeholder": "Введите пароль",
            "autocomplete": "new-password"
        })
    )

    password2 = forms.CharField(
        label="Подтверждение пароля",
        widget=forms.PasswordInput(attrs={
            "placeholder": "Повторите пароль",
            "autocomplete": "new-password"
        })
    )

    class Meta:
        model = CustomUser
        fields = (
            "first_name",
            "last_name",
            "email",
            "password1",
            "password2",
            "gender",
            "city",
            "birth_date",
            "phone_number",
        )

    def save(self, commit=True):
        user = super().save(commit=commit)
        if commit:
            Profile.objects.create(
                user=user,
                gender=self.cleaned_data.get("gender"),
                city=self.cleaned_data.get("city"),
                birth_date=self.cleaned_data.get("birth_date"),
                phone_number=self.cleaned_data.get("phone_number"),
            )
        return user


class LoginForm(AuthenticationForm):
    username = forms.EmailField(
        label="Электронная почта",
        widget=forms.EmailInput(attrs={
            "placeholder": "example@mail.ru",
            "autocomplete": "username"
        })
    )
    password = forms.CharField(
        label="Пароль",
        widget=forms.PasswordInput(attrs={
            "placeholder": "Введите пароль",
            "autocomplete": "current-password"
        })
    )

class ProfileEditForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['gender', 'city', 'birth_date']
        widgets = {
            'birth_date': forms.DateInput(attrs={'type': 'date'}),
        }

class UserEditForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name']