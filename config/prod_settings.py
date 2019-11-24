import os
from .settings import BASE_DIR


SECRET_KEY = 'n(b+v==45q2p11(#2$7-g-g!6x86*+&9vqsilydyv_q!7y83(k'

ALLOWED_HOSTS = ["*"]

DEBUG = False

# MIDDLEWARE CONFIGURATION
# ------------------------------------------------------------------------------
SECURITY_MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
]

# https://github.com/ottoyiu/django-cors-headers#setup
CORS_MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
]

DJANGO_MIDDLEWARE = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
# See: https://whitenoise.readthedocs.io/
WHITENOISE_MIDDLEWARE = ['whitenoise.middleware.WhiteNoiseMiddleware', ]

MIDDLEWARE = SECURITY_MIDDLEWARE + CORS_MIDDLEWARE + WHITENOISE_MIDDLEWARE + DJANGO_MIDDLEWARE


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'django_chat_db',
        'USER': 'cellon',
        'PASSWORD': 'admin',
        'HOST' : '127.0.0.1',
        'PORT' : '5432',
    }
}

STATIC_ROOT = os.path.join(BASE_DIR, 'static/')

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'builds/',
        'STATS_FILE': os.path.join(
            STATIC_ROOT,
            'webpack',
            'webpack-stats.production.json'
        )
    }
}
