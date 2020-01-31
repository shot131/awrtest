# Generated by Django 3.0 on 2020-01-30 19:17

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TimeValue',
            fields=[
                ('time', models.IntegerField(primary_key=True, serialize=False)),
                ('value', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'unique_together': {('time', 'value')},
            },
        ),
    ]