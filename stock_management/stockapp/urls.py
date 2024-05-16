from django.urls import path
from .views import UserRegisterView, UserLoginView, AddStockToWatchlist

urlpatterns = [
    path('register', UserRegisterView.as_view(), name='register'),
    path('login', UserLoginView.as_view(), name='login'),
    path('user/<int:user_id>/watchlist/<int:watchlist_id>/add_stock/', AddStockToWatchlist.as_view(), name='add_stock_to_watchlist'),
]
