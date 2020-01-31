from django.db import models
from django.utils import timezone


class LoginCount(models.Model):
    username = models.CharField(blank=False, max_length=150, primary_key=True, unique=True)
    count = models.PositiveSmallIntegerField(blank=False, default=0)
    blocked_until = models.DateTimeField(null=True)

    class Meta:
        verbose_name = 'Попытка входа'
        verbose_name_plural = 'Попытки входа'
