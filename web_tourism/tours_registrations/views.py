from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import TourRegistration
from tours.models import Tour  # 
from account.models import Profile  # чтобы получить данные профиля

@login_required
def register_for_tour(request, tour_id):
    tour = get_object_or_404(Tour, id=tour_id)

    # Проверяем, не зарегистрирован ли уже пользователь
    if TourRegistration.objects.filter(user=request.user, tour=tour).exists():
        messages.warning(request, "Вы уже зарегистрированы на этот маршрут.")
        return redirect('tours_registrations:my_registrations')

    if request.method == 'POST':
        TourRegistration.objects.create(user=request.user, tour=tour)
        messages.success(request, f"Вы успешно зарегистрировались на маршрут: {tour.name}")
        return redirect('tours_registrations:my_registrations')

    # Получаем данные из профиля
    profile = getattr(request.user, 'profile', None)
    user_data = {
        'first_name': request.user.first_name,
        'last_name': request.user.last_name,
        'city': profile.city if profile else '',
        'phone': profile.phone_number if profile else '',
    }

    context = {
        'tour': tour,
        'user_data': user_data,
    }
    return render(request, 'tours_registrations/register.html', context)

@login_required
def my_registrations(request):
    registrations = TourRegistration.objects.filter(user=request.user).select_related('tour')
    return render(request, 'tours_registrations/my_registrations.html', {'registrations': registrations})