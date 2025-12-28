from rest_framework import serializers
from django.contrib.auth import get_user_model
from datetime import datetime, date
from .models import TourRegistration
from tours.models import Tour

User = get_user_model()


class TourRegistrationSerializer(serializers.ModelSerializer):
    """Сериализатор для модели TourRegistration"""
    tour_name = serializers.CharField(source='tour.name', read_only=True)
    tour_min_age = serializers.IntegerField(source='tour.min_age', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = TourRegistration
        fields = [
            'id',
            'user',
            'user_email',
            'tour',
            'tour_name',
            'tour_min_age',
            'registration_date',
            'status',
            'participant_first_name',
            'participant_last_name',
            'participant_birth_date',
            'participant_phone',
            'participant_email',
            'participant_city',
        ]
        read_only_fields = ['id', 'registration_date', 'user']

    def validate_participant_birth_date(self, value):
        """Проверяем возраст участника"""
        try:
            tour = self.context['request'].data.get('tour')
            if not tour:
                # Если в контексте нет tour, пропускаем проверку
                return value

            # Получаем тур из БД
            from tours.models import Tour
            tour_obj = Tour.objects.get(id=tour)

            # Проверяем минимальный возраст
            if tour_obj.min_age > 0:
                today = date.today()
                birth_date = value if isinstance(value, date) else datetime.strptime(str(value), '%Y-%m-%d').date()
                age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

                if age < tour_obj.min_age:
                    raise serializers.ValidationError(
                        f"Минимальный возраст для этого маршрута: {tour_obj.min_age} лет. Ваш возраст: {age} лет"
                    )
        except Tour.DoesNotExist:
            pass

        return value

    def validate_participant_email(self, value):
        """Проверяем уникальность email при регистрации на новый тур"""
        tour_id = self.context['request'].data.get('tour')

        # Проверяем, не зарегистрирован ли уже этот email на этот тур
        if TourRegistration.objects.filter(
            tour_id=tour_id,
            participant_email=value
        ).exists():
            raise serializers.ValidationError(
                f"Пользователь с email '{value}' уже зарегистрирован на этот маршрут"
            )

        return value

    def create(self, validated_data):
        """Переопределение создания - используем текущего пользователя"""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
