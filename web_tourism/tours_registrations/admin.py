# tours_registrations/admin.py

from django.contrib import admin
from .models import TourRegistration

@admin.register(TourRegistration)
class TourRegistrationAdmin(admin.ModelAdmin):
    list_display = ('user', 'tour', 'registration_date', 'status')
    list_filter = ('status', 'registration_date')
    search_fields = ('user__email', 'tour__name')