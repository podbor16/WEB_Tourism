from django.db import models
from django.contrib.auth import get_user_model
from tours.models import Tour  # 

User = get_user_model()

class TourRegistration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE)  # <-- обновлено
    registration_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Ожидает'),
        ('confirmed', 'Подтверждён'),
        ('cancelled', 'Отменён'),
    ], default='pending')

    def __str__(self):
        return f"{self.user.email} — {self.tour.name}"