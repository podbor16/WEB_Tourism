from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Profile"""
    email = serializers.CharField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = Profile
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'gender',
            'city',
            'birth_date',
            'country_code',
            'phone_number',
        ]
        read_only_fields = ['id', 'email', 'first_name', 'last_name']


class UserSerializer(serializers.ModelSerializer):
    """Сериализатор для модели CustomUser"""
    profile = ProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'is_active',
            'is_staff',
            'profile',
        ]
        read_only_fields = ['id', 'is_active', 'is_staff']


class RegisterSerializer(serializers.ModelSerializer):
    """Сериализатор для регистрации новых пользователей"""
    password = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True, min_length=6)
    
    class Meta:
        model = User
        fields = [
            'email',
            'first_name',
            'last_name',
            'password',
            'password2',
        ]
    
    def validate_email(self, value):
        """Проверяем уникальность email"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Пользователь с таким email уже зарегистрирован")
        return value

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({
                'password2': 'Пароли не совпадают'
            })
        return data
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data.pop('password2')
        user = User.objects.create_user(
            password=password,
            **validated_data
        )
        # Создаем профиль
        Profile.objects.create(user=user)
        return user
