from django.urls import path
from . import views

urlpatterns = [
    path('shop/', views.product_list, name='shop'),
    path('product/<slug:slug>/', views.product_detail, name='product_detail'),
]
