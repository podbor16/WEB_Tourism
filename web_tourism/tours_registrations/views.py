from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import TourRegistration
from .serializers import TourRegistrationSerializer


class TourRegistrationViewSet(viewsets.ModelViewSet):
    """API ViewSet для регистраций на туры"""
    serializer_class = TourRegistrationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Получить регистрации текущего пользователя"""
        return TourRegistration.objects.filter(user=self.request.user).select_related('tour')
    
    def create(self, request, *args, **kwargs):
        """Создать новую регистрацию на тур"""
        tour_id = request.data.get('tour')
        
        # Проверяем, не зарегистрирован ли уже
        if TourRegistration.objects.filter(user=request.user, tour_id=tour_id).exists():
            return Response(
                {'detail': 'Вы уже зарегистрированы на этот тур'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return super().create(request, *args, **kwargs)
    
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
