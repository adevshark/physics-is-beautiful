# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-02-16 05:26
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('djeddit', '0011_auto_20190216_0826'),
        ('resources', '0022_auto_20190201_1218'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='thread',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='textbook_resource', to='djeddit.Thread'),
        ),
        migrations.AddField(
            model_name='textbookproblem',
            name='thread',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='textbook_problem', to='djeddit.Thread'),
        ),
    ]
