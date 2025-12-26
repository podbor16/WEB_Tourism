from django.shortcuts import render, get_object_or_404
from .models import Tour

def tour_list(request):
    tours = Tour.objects.all()
    return render(request, 'tours/list.html', {'tours': tours})

def tour_detail(request, tour_id):
    tour = get_object_or_404(Tour, id=tour_id)
    return render(request, 'tours/detail.html', {'tour': tour})