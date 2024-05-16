from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Stock
from .serializers import UserSerializer, StockSerializer
from django.shortcuts import get_object_or_404

class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                return Response({'message': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

class AddStockToWatchlist(APIView):
    def post(self, request, user_id, watchlist_id):
        try:
            user = User.objects.get(id=user_id)
            print(user)
            print(watchlist_id)
            watchlist_index = watchlist_id - 1
            stock_name = request.data.get('stockName')
            user.watchlists[watchlist_index].append(stock_name)
            print(user.watchlists)
            user.save()
            return Response({'message': f'Stock {stock_name} added to watchlist {watchlist_id} for user {user_id}'}, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
