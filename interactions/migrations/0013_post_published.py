# Generated by Django 3.0.8 on 2020-08-05 22:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interactions', '0012_auto_20200804_1422'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='published',
            field=models.BooleanField(default=False),
        ),
    ]