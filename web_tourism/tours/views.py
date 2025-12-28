from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, BasePermission
from django.db.models import Count
from .models import Tour
from .serializers import TourSerializer


class IsStaffOrReadOnly(BasePermission):
    """Только staff может создавать, обновлять и удалять туры"""
    def has_permission(self, request, view):
        # Read permissions allowed to any access
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True
        # Write permissions only for staff
        return request.user and request.user.is_authenticated and request.user.is_staff


class TourViewSet(viewsets.ModelViewSet):
    """API ViewSet для туров"""
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
    permission_classes = [IsStaffOrReadOnly]
    
    def get_queryset(self):
        """Фильтрация по типу тура"""
        queryset = Tour.objects.all()
        tour_type = self.request.query_params.get('type')
        if tour_type:
            queryset = queryset.filter(type=tour_type)
        return queryset
    
    @action(detail=False, methods=['get'])
    def types(self, request):
        """Получить список всех типов туров"""
        types = Tour.objects.values_list('type', flat=True).distinct()
        return Response({'types': list(types)})

    @action(detail=False, methods=['get'])
    def popular(self, request):
        """Получить топ-3 популярных маршрута по количеству регистраций"""
        from tours_registrations.models import TourRegistration

        # Получаем туры с количеством регистраций, отсортированные по количеству
        popular_tours = (
            Tour.objects
            .annotate(registration_count=Count('tourregistration', distinct=True))
            .order_by('-registration_count')[:3]
        )

        serializer = self.get_serializer(popular_tours, many=True)
        return Response({
            'results': serializer.data,
            'count': len(serializer.data)
        })

