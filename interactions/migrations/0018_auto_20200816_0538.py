# Generated by Django 3.0.8 on 2020-08-16 09:38

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('interactions', '0017_auto_20200815_2015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='saveBy',
            field=models.ManyToManyField(blank=True, related_name='saved_posts', to=settings.AUTH_USER_MODEL),
        ),
    ]