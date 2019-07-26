import os
from .settings import BASE_DIR


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


# Webpack Loader by Owais Lane
# ------------------------------------------------------------------------------
# https://github.com/owais/django-webpack-loader
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'builds/',
        'STATS_FILE': os.path.join(BASE_DIR, 'frontend', 'webpack', 'webpack-stats.production.json')
    }
}
