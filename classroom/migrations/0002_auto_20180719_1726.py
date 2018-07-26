# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-07-19 14:26
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('classroom', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classroom',
            name='students',
            field=models.ManyToManyField(related_name='as_student_classrooms', through='classroom.ClassroomStudent', to='profiles.Profile'),
        ),
        migrations.AlterField(
            model_name='classroom',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='as_teacher_classrooms', to='profiles.Profile'),
        ),
        migrations.AlterField(
            model_name='classroomstudent',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profiles.Profile'),
        ),
    ]