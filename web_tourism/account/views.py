from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.utils.decorators import method_decorator
from .models import Profile
from .serializers import UserSerializer, RegisterSerializer, ProfileSerializer

User = get_user_model()


class AuthViewSet(viewsets.ViewSet):
    """ViewSet для аутентификации"""
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'])
    @method_decorator(ensure_csrf_cookie)
    def csrf_token(self, request):
        """Получить CSRF токен и инициализировать сессию"""
        token = get_token(request)
        print(f"CSRF токен выдан: {token}, session: {request.session.session_key}")
        return Response({'csrfToken': token})
    
    @action(detail=False, methods=['post'])
    def register(self, request):
        """Регистрация нового пользователя"""
        try:
            serializer = RegisterSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                # Авторизуем пользователя после регистрации
                from django.contrib.auth import login
                from django.contrib.auth.backends import ModelBackend
                
                # Явно устанавливаем backend чтобы сессия работала
                user.backend = 'django.contrib.auth.backends.ModelBackend'
                login(request, user, backend='django.contrib.auth.backends.ModelBackend')
                
                print(f"Пользователь {user.email} авторизован, session: {request.session.session_key}")
                
                return Response(
                    {
                        'detail': 'Регистрация успешна',
                        'user': UserSerializer(user).data
                    },
                    status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            import traceback
            print(f"Ошибка при регистрации: {str(e)}")
            traceback.print_exc()
            return Response(
                {'detail': f'Ошибка при регистрации: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        """Вход в систему"""
        from django.contrib.auth import authenticate, login
        
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response(
                {'detail': 'Email и пароль необходимы'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(username=email, password=password)
        if user is None:
            return Response(
                {'detail': 'Неверные учетные данные'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Вход в систему с явным указанием backend
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        
        print(f"Пользователь {user.email} вошёл, session: {request.session.session_key}")
        
        return Response(
            {
                'detail': 'Успешный вход',
                'user': UserSerializer(user).data
            },
            status=status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['post'])
    def logout(self, request):
        """Выход из системы"""
        from django.contrib.auth import logout
        logout(request)
        return Response(
            {'detail': 'Успешный выход'},
            status=status.HTTP_200_OK
        )


class UserViewSet(viewsets.ViewSet):
    """ViewSet для работы с профилем пользователя"""
    
    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def me(self, request):
        """Получить информацию о текущем пользователе"""
        # Если пользователь не авторизован, вернуть пусто
        if not request.user.is_authenticated:
            return Response(None, status=status.HTTP_200_OK)
        
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['put', 'patch'], permission_classes=[IsAuthenticated])
    @method_decorator(csrf_exempt)
    def profile(self, request):
        """Обновить профиль пользователя"""
        try:
            profile = request.user.profile
            serializer = ProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                print(f"Профиль пользователя {request.user.email} успешно обновлён")
                return Response(
                    {
                        'detail': 'Профиль обновлен',
                        'data': serializer.data
                    },
                    status=status.HTTP_200_OK
                )
            print(f"Ошибки валидации: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Ошибка при обновлении профиля: {str(e)}")
            import traceback
            traceback.print_exc()
            return Response(
                {'detail': f'Ошибка при обновлении профиля: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

