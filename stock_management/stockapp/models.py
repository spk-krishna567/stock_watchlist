from django.db import models



class User(models.Model):
    username = models.CharField(max_length=100, null=False)  # Added null=False
    email = models.EmailField(unique=True, null=False)  # Added null=False
    usertype = models.CharField(max_length=50, null=False)  # Added null=False
    password = models.CharField(max_length=100, null=False)  # Added null=False
    watchlists = models.CharField(max_length=1000, default='[]', null=False)
    def __str__(self):
        return self.username

class Stock(models.Model):
    name = models.CharField(max_length=100, null=False)  # Added null=False
    symbol = models.CharField(max_length=20, unique=True, null=False)  # Added null=False

    def __str__(self):
        return self.symbol
  