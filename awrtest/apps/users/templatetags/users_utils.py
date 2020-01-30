import math, re
from django import template
from django.urls import reverse

register = template.Library()


@register.simple_tag(takes_context=True)
def limited_page_range(context, show_max_pages=5):
    current_page = context['page_obj'].number
    num_pages = context['paginator'].num_pages
    start = (current_page - math.floor(show_max_pages / 2)) - 1
    end = current_page + math.floor(show_max_pages / 2)

    if start < 0:
        start = 0
        end = show_max_pages

    if end >= num_pages:
        end = num_pages
        start = max(0, end - show_max_pages)

    return range(start + 1, end+1)


@register.inclusion_tag('includes/menu.html', takes_context=True)
def menu(context):
    menu_items = {
        'user': context['request'].user,
        'menu': [{
            'title': 'Статистика',
            'link': reverse('statistic:statistic'),
            'current': False,
            'active': False,
        }]
    }
    if context['request'].user.has_perm('auth.user.can_view_user'):
        menu_items['menu'].append({
            'title': 'Пользователи',
            'link': reverse('users:list'),
            'current': False,
            'active': False,
        })
    for item in menu_items['menu']:
        if item['link'] == context['request'].path:
            item['current'] = True
        if len(item['link']) > 1 and re.search(r'^' + re.escape(item['link']), context['request'].path):
            item['active'] = True
    return menu_items
