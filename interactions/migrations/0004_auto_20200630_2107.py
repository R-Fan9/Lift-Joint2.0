# Generated by Django 3.0.7 on 2020-07-01 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interactions', '0003_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='toQuestions',
            field=models.ManyToManyField(null=True, related_name='tags', to='interactions.Question'),
        ),
    ]