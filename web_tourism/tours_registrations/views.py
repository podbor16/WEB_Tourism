from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import date
from .models import TourRegistration
from .serializers import TourRegistrationSerializer
from tours.models import Tour


class TourRegistrationViewSet(viewsets.ModelViewSet):
    """API ViewSet для регистраций на туры"""
    serializer_class = TourRegistrationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Получить регистрации текущего пользователя"""
        return TourRegistration.objects.filter(user=self.request.user).select_related('tour')
    
    def create(self, request, *args, **kwargs):
        """Создать новую регистрацию на тур"""
        try:
            tour_id = request.data.get('tour')
            participant_email = request.data.get('participant_email')
            participant_birth_date = request.data.get('participant_birth_date')

            # Проверяем наличие обязательных полей
            if not tour_id:
                return Response(
                    {'detail': 'ID тура обязателен'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Получаем тур
            try:
                tour = Tour.objects.get(id=tour_id)
            except Tour.DoesNotExist:
                return Response(
                    {'detail': 'Маршрут не найден'},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Проверяем возраст участника
            if tour.min_age > 0 and participant_birth_date:
                from datetime import datetime
                birth_date = datetime.strptime(str(participant_birth_date), '%Y-%m-%d').date()
                today = date.today()
                age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

                if age < tour.min_age:
                    return Response(
                        {
                            'detail': f'Минимальный возраст для этого маршрута: {tour.min_age} лет. Возраст участника: {age} лет'
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Проверяем, не зарегистрирован ли уже этот email на этот тур
            if participant_email and TourRegistration.objects.filter(
                tour_id=tour_id,
                participant_email=participant_email,
                status__in=['pending', 'confirmed']
            ).exists():
                return Response(
                    {'detail': f'Пользователь с email "{participant_email}" уже зарегистрирован на этот маршрут'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            return super().create(request, *args, **kwargs)
        except Exception as e:
            print(f"Ошибка при регистрации на тур: {str(e)}")
            import traceback
            traceback.print_exc()
            return Response(
                {'detail': f'Ошибка при регистрации: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Отменить регистрацию"""
        registration = self.get_object()
        registration.status = 'cancelled'
        registration.save()
        serializer = self.get_serializer(registration)
        return Response(
            {'detail': 'Регистрация отменена', 'data': serializer.data},
            status=status.HTTP_200_OK
        )
    
    @action(detail=True, methods=['post'])
    def reactivate(self, request, pk=None):
        """Восстановить отменённую регистрацию"""
        registration = self.get_object()
        if registration.status != 'cancelled':
            return Response(
                {'detail': 'Эта регистрация не была отменена'},
                status=status.HTTP_400_BAD_REQUEST
            )
        registration.status = 'pending'
        registration.save()
        serializer = self.get_serializer(registration)
        return Response(
            {'detail': 'Регистрация восстановлена', 'data': serializer.data},
            status=status.HTTP_200_OK
        )
