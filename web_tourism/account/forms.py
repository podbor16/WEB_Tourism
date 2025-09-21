from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import CustomUser, Profile


class RegistrationForm(UserCreationForm):
    # Дополнительные поля для профиля
    gender = forms.ChoiceField(choices=Profile.GENDER_CHOICES, required=False, label="Пол")
    city = forms.CharField(max_length=100, required=False, label="Город")
    birth_date = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={"type": "date"}),
        label="Дата рождения"
    )
    phone_number = forms.CharField(max_length=20, required=False, label="Телефон")

    class Meta:
        model = CustomUser
        # ⚠️ только поля из CustomUser!
        fields = ("first_name", "last_name", "email", "password1", "password2")

    def save(self, commit=True):
        user = super().save(commit=commit)
        if commit:
            # создаём связанный профиль
            Profile.objects.create(
                user=user,
                gender=self.cleaned_data.get("gender"),
                city=self.cleaned_data.get("city"),
                birth_date=self.cleaned_data.get("birth_date"),
                phone_number=self.cleaned_data.get("phone_number"),
            )
        return user


class LoginForm(AuthenticationForm):
    username = forms.EmailField(label="Электронная почта")
