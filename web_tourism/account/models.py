from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField('Телефон', max_length=20, blank=True)
    city = models.CharField('Город', max_length=255, blank=True)
    birth_date = models.DateField('Дата рождения', null=True, blank=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    else:
        try:
            instance.profile.save()
        except Exception:
            # если профиль не существует (неоднозначные случаи), создаём его
            Profile.objects.get_or_create(user=instance)
