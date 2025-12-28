from django.db import models
from django.contrib.auth import get_user_model
from tours.models import Tour

User = get_user_model()

class TourRegistration(models.Model):
    # Пользователь, который зарегистрировался
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE)
    registration_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Ожидает'),
        ('confirmed', 'Подтверждён'),
        ('cancelled', 'Отменён'),
    ], default='pending')

    # Данные участника (могут отличаться от профиля пользователя)
    participant_first_name = models.CharField(max_length=50)
    participant_last_name = models.CharField(max_length=50)
    participant_birth_date = models.DateField()
    participant_phone = models.CharField(max_length=15)
    participant_email = models.EmailField()
    participant_city = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.participant_first_name} {self.participant_last_name} — {self.tour.name}"

    class Meta:
        verbose_name = "Регистрация на тур"
        verbose_name_plural = "Регистрации на туры"
