# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-09-27 11:44
from __future__ import unicode_literals

from django.db import migrations, models
import django_light_enums.db


class Migration(migrations.Migration):

    dependencies = [
        ('curricula', '0028_auto_20180716_2226'),
    ]

    operations = [
        migrations.AddField(
            model_name='curriculum',
            name='cover_photo',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]