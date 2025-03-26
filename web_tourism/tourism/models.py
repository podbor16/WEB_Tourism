from django.db import models

# Модель "Мои зарегистрированные"
class RegisteredUser(models.Model):
    surname = models.CharField("Фамилия", max_length=255)
    name = models.CharField("Имя", max_length=255)
    birth_date = models.DateField("Дата рождения")
    phone = models.CharField("Телефон", max_length=20)
    email = models.EmailField("Почта")
    city = models.CharField("Город", max_length=255)
    password = models.CharField("Пароль", max_length=255)

    def __str__(self):
        return f"{self.surname} {self.name}"

# Модель "Связь заявок"
class hike(models.Model):
    hike_text = models.TextField("Название похода")
    hike_date = models.DateField("Дата похода")
    hike_type = models.CharField("Тип похода", max_length=255)

    def __str__(self):
        return f"{self.hike_text} - {self.hike_date}"
    
    # Модель "Заявки зарегистрированных с 'походы'"
class Application(models.Model):
    user = models.ForeignKey(RegisteredUser, on_delete=models.CASCADE, related_name="applications")
    hike = models.ForeignKey(hike, on_delete=models.CASCADE, related_name="applications")
    payment_id = models.CharField("id_платежа", max_length=255)
    bank = models.CharField("Банк", max_length=255)
    order_amount = models.DecimalField("Сумма заказа", max_digits=10, decimal_places=2)
    discount_id = models.CharField("id_скидки", max_length=255, null=True, blank=True)
    discount_amount = models.DecimalField("Сумма скидки", max_digits=10, decimal_places=2, null=True, blank=True)
    source_type = models.CharField("Откуда пришел клиент", max_length=255, null=True, blank=True)
    tick_status = models.BooleanField("Статус галочки")

    def __str__(self):
        return f"{self.user} - {self.hike}"