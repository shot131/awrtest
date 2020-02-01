from django.views.generic import View
from django.http import JsonResponse, HttpResponseForbidden
from statistic.models import TimeValue
from django.utils import timezone
import json


class ApiView(View):
    allowed_ids = [
        'FG3f4h7t973h4g5b3498h'
    ]

    def get_data(self):
        return json.loads(self.request.POST.get('data', '{}'))

    def authenticate_request(self):
        result = False
        data = self.get_data()
        api_id = data.get('id')
        if api_id in ApiView.allowed_ids:
            result = True
        return result


class AddMessage(ApiView):
    def post(self, request, *args, **kwargs):
        if self.authenticate_request():
            data = self.get_data()
            time = data.get('time')
            value = data.get('value')
            if isinstance(time, int) and isinstance(value, int):
                time_value = TimeValue(time=time, value=value)
                time_value.save()
                result = JsonResponse({'success': True})
            else:
                result = JsonResponse({'success': False, 'error': 'Не удалось извлечь сообщение из запроса.'})
        else:
            result = HttpResponseForbidden('Авторизация отклонена.')
        return result
