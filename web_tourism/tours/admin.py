from django.contrib import admin
from .models import Tour

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'price', 'type')
    search_fields = ('name', 'description')
    list_filter = ('start_date', 'type')