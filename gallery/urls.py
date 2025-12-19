from django.urls import path
from . import views

urlpatterns = [
    path('gallery/', views.artwork_list, name='gallery'),
    path('artwork/<slug:slug>/', views.artwork_detail, name='artwork_detail'),
]
