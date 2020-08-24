# Generated by Django 3.0.8 on 2020-08-09 08:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interactions', '0013_post_published'),
    ]

    operations = [
        migrations.AddField(
            model_name='postimg',
            name='imgUrl',
            field=models.CharField(max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='postimg',
            name='image',
            field=models.ImageField(null=True, upload_to='postImg/%Y/%m/%D/'),
        ),
    ]
