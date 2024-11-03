from django.shortcuts import render

def start_page(request):
    return render(request, 'start.html')

def media_page(request):
    return render(request, 'media.html')

def about_project_page(request):
    return render(request, 'about_project.html')

def medicine_page(request):
    return render(request, 'medicine.html')

def header(request):
    return render(request, 'header.html')

def equipment_page(request):
    return render(request, 'equipment.html')

def walking_tourism__page(request):
    return render(request, 'walking_tourism.html')

def water_tourism__page(request):
    return render(request, 'water_tourism.html')

def mountain_tourism__page(request):
    return render(request, 'mountain_tourism.html')

def stolby_route_page(request):
    return render(request, 'stolby_route.html')

def mansky_route_page(request):
    return render(request, 'mansky_route.html')

def elbrus_route_page(request):
    return render(request, 'elbrus_route.html')