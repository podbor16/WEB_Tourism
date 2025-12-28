from rest_framework import serializers
from .models import Tour


class TourSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Tour"""
    difficulty_display = serializers.CharField(source='get_difficulty_display', read_only=True)

    class Meta:
        model = Tour
        fields = [
            'id',
            'name',
            'description',
            'start_date',
            'end_date',
            'price',
            'type',
            'image',
            'min_age',
            'difficulty',
            'difficulty_display',
        ]
        read_only_fields = ['id', 'difficulty_display']
