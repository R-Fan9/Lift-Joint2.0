# Generated by Django 3.0.7 on 2020-06-30 01:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interactions', '0002_answer_picture'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=50)),
                ('toQuestions', models.ManyToManyField(related_name='tags', to='interactions.Question')),
            ],
        ),
    ]