# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-21 15:47
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=200)),
                ('votes', models.IntegerField(default=0)),
                ('position', models.PositiveSmallIntegerField(null=True, verbose_name=b'Position')),
            ],
            options={
                'ordering': ['position'],
            },
        ),
        migrations.CreateModel(
            name='Curriculum',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('pub_date', models.DateTimeField(verbose_name=b'date published')),
            ],
            options={
                'verbose_name_plural': 'curricula',
            },
        ),
        migrations.CreateModel(
            name='DrawVector',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_text', models.CharField(max_length=200)),
                ('magnitude', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name=b'Magnitude')),
                ('angle', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name=b'Angle')),
                ('xComponent', models.SmallIntegerField(blank=True, null=True, verbose_name=b'x-Component')),
                ('yComponent', models.SmallIntegerField(blank=True, null=True, verbose_name=b'y-Component')),
                ('pub_date', models.DateTimeField(verbose_name=b'date published')),
                ('image', models.ImageField(blank=True, upload_to=b'')),
                ('position', models.PositiveSmallIntegerField(null=True, verbose_name=b'Position')),
            ],
            options={
                'ordering': ['position'],
            },
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('published_on', models.DateTimeField(verbose_name=b'date published')),
                ('image', models.ImageField(blank=True, upload_to=b'')),
                ('position', models.PositiveSmallIntegerField(null=True, verbose_name=b'Position')),
            ],
            options={
                'ordering': ['position'],
            },
        ),
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('published_on', models.DateTimeField(verbose_name=b'date published')),
                ('image', models.ImageField(blank=True, upload_to=b'')),
                ('position', models.PositiveSmallIntegerField(null=True, verbose_name=b'Position')),
            ],
            options={
                'ordering': ['position'],
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=200)),
                ('published_on', models.DateTimeField(verbose_name=b'date published')),
                ('image', models.ImageField(blank=True, upload_to=b'')),
                ('position', models.PositiveSmallIntegerField(null=True, verbose_name=b'Position')),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='curricula.Lesson')),
            ],
            options={
                'ordering': ['position'],
            },
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('published_on', models.DateTimeField(verbose_name=b'date published')),
                ('position', models.PositiveSmallIntegerField(null=True, verbose_name=b'Position')),
                ('curriculum', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='curricula.Curriculum')),
            ],
            options={
                'ordering': ['position'],
            },
        ),
        migrations.AddField(
            model_name='module',
            name='unit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='curricula.Unit'),
        ),
        migrations.AddField(
            model_name='lesson',
            name='module',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='curricula.Module'),
        ),
        migrations.AddField(
            model_name='drawvector',
            name='lesson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='curricula.Lesson'),
        ),
        migrations.AddField(
            model_name='choice',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='curricula.Question'),
        ),
    ]
