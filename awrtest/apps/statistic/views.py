from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from django.http import JsonResponse
from .models import TimeValue
from django.forms.models import model_to_dict
from django.db.models import Max, Min
from django.utils import timezone
import json
import re


@method_decorator(login_required, name='dispatch')
class Statistic(TemplateView):
    template_name = 'statistic.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        time_format = '%Y-%m-%dT%H:%M'
        items = TimeValue.objects.all()

        start_date = self.request.GET.get('stat-start')
        if start_date and re.match(r'[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}', start_date):
            date = timezone.datetime.strptime(start_date, time_format)
            items = items.filter(time__gte=date.timestamp())

        end_date = self.request.GET.get('stat-end')
        if end_date and re.match(r'[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}', end_date):
            date = timezone.datetime.strptime(end_date, time_format)
            items = items.filter(time__lte=date.timestamp())

        chart_data = []
        for item in items:
            chart_data.append(model_to_dict(item, fields=('time', 'value')))
        context['chart_data'] = json.dumps(chart_data)

        last_activity = TimeValue.objects.aggregate(Max('created_at'))

        min_time = TimeValue.objects.aggregate(Min('time'))
        context['stat_min'] = timezone.datetime.now().strftime(time_format)
        if min_time:
            context['stat_min'] = timezone.datetime.utcfromtimestamp(min_time['time__min']).strftime(time_format)

        max_time = TimeValue.objects.aggregate(Max('time'))
        context['stat_max'] = timezone.datetime.now().strftime(time_format)
        if max_time:
            context['stat_max'] = timezone.datetime.utcfromtimestamp(max_time['time__max']).strftime(time_format)

        context['last_activity'] = last_activity['created_at__max'].strftime("%d.%m.%Y %H:%M:%S")

        return context

    def get(self, request, *args, **kwargs):
        if request.is_ajax():
            context = self.get_context_data(**kwargs)
            result = JsonResponse({
                'chart_data': json.loads(context['chart_data']),
                'last_activity': context['last_activity'],
            }, **kwargs)
        else:
            result = super().get(request, *args, **kwargs)
        return result
