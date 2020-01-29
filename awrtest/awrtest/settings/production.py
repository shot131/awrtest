from .base import *

ALLOWED_HOSTS = []
DEBUG = False
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'laudatours',
        'USER': 'laudatours',
        'PASSWORD': 'laudatours',
        'HOST': 'localhost',
        'PORT': '3306',
        'TIME_ZONE': 'Europe/Moscow',
        'OPTIONS': {
            'init_command': 'SET default_storage_engine=INNODB',
        }
    }
}