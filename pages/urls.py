from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('exhibitions/', views.exhibitions, name='exhibitions'),
    path('exhibitions/<slug:slug>/', views.exhibition_detail, name='exhibition_detail'),
]
