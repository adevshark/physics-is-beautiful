# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-12-18 11:43
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('djeddit', '0009_auto_20181210_1810'),
        ('resources', '0016_auto_20181217_1528'),
    ]

    operations = [
        migrations.AddField(
            model_name='textbooksolution',
            name='thread',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='test_book_solutions', to='djeddit.Thread'),
        ),
    ]
