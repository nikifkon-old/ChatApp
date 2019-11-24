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

# This is required to go first! See: https://github.com/ottoyiu/django-cors-headers#setup
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
# Use Whitenoise to serve static files
# See: https://whitenoise.readthedocs.io/
WHITENOISE_MIDDLEWARE = ['whitenoise.middleware.WhiteNoiseMiddleware', ]

# CORS Needs to go first! See: https://github.com/ottoyiu/django-cors-headers#setup
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


# Webpack Loader by Owais Lane
# ------------------------------------------------------------------------------
# https://github.com/owais/django-webpack-loader
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'builds/',
        'STATS_FILE': os.path.join(BASE_DIR, 'frontend', 'webpack', 'webpack-stats.production.json')
    }
}

STATIC_ROOT = os.path.join(BASE_DIR, 'static/')
