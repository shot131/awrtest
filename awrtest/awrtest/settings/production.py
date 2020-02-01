from .base import *

ALLOWED_HOSTS = [
    '213.219.214.58'
]

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'awrtest',
        'USER': 'awrtest',
        'PASSWORD': 'awrtest123',
        'HOST': 'localhost',
        'PORT': '3306',
        'TIME_ZONE': 'Europe/Moscow',
        'OPTIONS': {
            'init_command': 'SET default_storage_engine=INNODB',
        }
    }
}

STATIC_ROOT = os.path.join(BASE_DIR, 'static/')