from django.db import models

class Tour(models.Model):
    name = models.CharField("Название похода", max_length=255)
    description = models.TextField("Описание похода", blank=True, null=True)
    start_date = models.DateField("Дата начала похода")
    end_date = models.DateField("Дата окончания похода", blank=True, null=True)
    price = models.DecimalField("Стоимость", max_digits=10, decimal_places=2, blank=True, null=True)
    type = models.CharField("Тип похода", max_length=255)
    image = models.ImageField(upload_to='tours/', blank=True, null=True)
    min_age = models.IntegerField("Минимальный возраст", default=0, help_text="0 = нет ограничений")

    def __str__(self):
        return f"{self.name} ({self.start_date} — {self.end_date})"

    class Meta:
        verbose_name = "Маршрут"
        verbose_name_plural = "Маршруты"