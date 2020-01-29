from .base import *

ALLOWED_HOSTS = [
    '192.168.56.101',
]
DEBUG = True

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'awrtest',
        'USER': 'awrtest',
        'PASSWORD': 'awrtest',
        'HOST': 'localhost',
        'PORT': '3306',
        'TIME_ZONE': 'Europe/Moscow',
        'OPTIONS': {
            'init_command': 'SET default_storage_engine=INNODB',
        }
    }
}