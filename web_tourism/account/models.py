from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.core.validators import RegexValidator


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Создание и сохранение обычного пользователя с email и паролем.
        """
        if not email:
            raise ValueError("У пользователя должен быть email")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Создание и сохранение суперпользователя.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Суперпользователь должен иметь is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Суперпользователь должен иметь is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Кастомная модель пользователя.
    """
    email = models.EmailField(unique=True, verbose_name="Электронная почта")
    first_name = models.CharField(max_length=50, verbose_name="Имя")
    last_name = models.CharField(max_length=50, verbose_name="Фамилия")
    is_staff = models.BooleanField(default=False, verbose_name="Статус персонала")
    is_active = models.BooleanField(default=True, verbose_name="Активен")

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'                # для авторизации используется email
    REQUIRED_FIELDS = ['first_name', 'last_name']  # обязательные поля при createsuperuser

    def __str__(self):
        return self.email


class Profile(models.Model):
    """
    Дополнительная информация о пользователе.
    """
    GENDER_CHOICES = [
        ('M', 'Мужской'),
        ('F', 'Женский'),
    ]

    COUNTRY_CHOICES = [
        ('+7', 'Россия (+7)'),
        ('+1', 'USA/Canada (+1)'),
        ('+44', 'UK (+44)'),
        ('+49', 'Germany (+49)'),
        ('+33', 'France (+33)'),
        ('+39', 'Italy (+39)'),
        ('+34', 'Spain (+34)'),
        ('+31', 'Netherlands (+31)'),
        ('+43', 'Austria (+43)'),
        ('+41', 'Switzerland (+41)'),
        ('+32', 'Belgium (+32)'),
        ('+46', 'Sweden (+46)'),
        ('+47', 'Norway (+47)'),
        ('+45', 'Denmark (+45)'),
        ('+358', 'Finland (+358)'),
        ('+48', 'Poland (+48)'),
        ('+420', 'Czech Republic (+420)'),
        ('+36', 'Hungary (+36)'),
        ('+40', 'Romania (+40)'),
        ('+30', 'Greece (+30)'),
        ('+90', 'Turkey (+90)'),
    ]

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="profile")
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True, verbose_name="Пол")
    city = models.CharField(max_length=100, blank=True, null=True, verbose_name="Город")
    birth_date = models.DateField(blank=True, null=True, verbose_name="Дата рождения")

    country_code = models.CharField(
        max_length=4,
        choices=COUNTRY_CHOICES,
        default='+7',
        verbose_name="Код страны"
    )
    phone_number = models.CharField(
        max_length=15,
        validators=[
            RegexValidator(
                regex=r'^\d{10,15}$',
                message="Введите номер телефона (10-15 цифр без пробелов)"
            )
        ],
        blank=True,
        null=True,
        verbose_name="Номер телефона"
    )

    def __str__(self):
        return f"Профиль {self.user.email}"
