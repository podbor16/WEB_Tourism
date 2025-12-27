from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import TourRegistration
from tours.models import Tour

User = get_user_model()


class TourRegistrationSerializer(serializers.ModelSerializer):
    """Сериализатор для модели TourRegistration"""
    tour_name = serializers.CharField(source='tour.name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = TourRegistration
        fields = [
            'id',
            'user',
            'user_email',
            'tour',
            'tour_name',
            'registration_date',
            'status',
        ]
        read_only_fields = ['id', 'registration_date', 'user']
        
    def create(self, validated_data):
        """Переопределение создания - используем текущего пользователя"""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
