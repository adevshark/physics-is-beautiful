# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-11-26 07:16
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0002_resource_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='textbookproblem',
            name='textbooksection',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='problems', to='resources.TextBookChapter'),
        ),
    ]