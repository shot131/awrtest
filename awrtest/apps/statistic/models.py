from django.db import models
from django.utils import timezone


class TimeValue(models.Model):
    time = models.IntegerField(null=False, primary_key=True)
    value = models.IntegerField(null=False, default=0)
    created_at = models.DateTimeField(null=False, default=timezone.now)

    class Meta:
        unique_together = (('time', 'value'),)
