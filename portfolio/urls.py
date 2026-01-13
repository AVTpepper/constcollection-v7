from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path('', views.home, name='home'),
    path('work/', views.work_index, name='work_index'),
    path('work/<str:category>/', views.work_category, name='work_category'),
    path('work/<str:category>/<slug:slug>/', views.work_detail, name='work_detail'),
    path('about/', views.about, name='about'),
    path('exhibitions/', views.exhibitions, name='exhibitions'),
    path('contact/', views.contact, name='contact'),
]
