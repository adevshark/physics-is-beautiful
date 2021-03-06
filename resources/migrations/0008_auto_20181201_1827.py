# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-12-01 15:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0005_auto_20180911_1204'),
        ('resources', '0007_textbooksolution_posted_by'),
    ]

    operations = [
        migrations.CreateModel(
            name='RecentUserResource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_access_date', models.DateTimeField(auto_now=True)),
                ('resource', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='resources.Resource')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recent_resources', to='profiles.Profile')),
            ],
        ),
        migrations.AlterField(
            model_name='textbooksolution',
            name='posted_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resources_solutions', to='profiles.Profile'),
        ),
    ]
