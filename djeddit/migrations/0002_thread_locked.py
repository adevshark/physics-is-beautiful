# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-05-29 06:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djeddit', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='thread',
            name='locked',
            field=models.BooleanField(default=False),
        ),
    ]
