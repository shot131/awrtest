import math
from django import template

register = template.Library()


@register.simple_tag
def limited_page_range(current_page, num_pages, show_max_pages=5):
    start = (current_page - math.floor(show_max_pages / 2)) - 1
    end = current_page + math.floor(show_max_pages / 2)

    if start < 0:
        start = 0
        end = show_max_pages

    if end >= num_pages:
        end = num_pages
        start = max(0, end - show_max_pages)

    return range(start + 1, end+1)
