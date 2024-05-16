# Generated by Django 4.1.13 on 2024-05-16 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Watchlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='user',
            name='watchlists',
        ),
        migrations.AddField(
            model_name='user',
            name='watchlists',
            field=models.ManyToManyField(to='stockapp.watchlist'),
        ),
    ]
