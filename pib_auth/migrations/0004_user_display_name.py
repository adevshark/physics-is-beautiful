# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-07-24 10:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pib_auth', '0003_auto_20170315_2057'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='display_name',
            field=models.CharField(blank=True, max_length=280),
        ),
    ]
