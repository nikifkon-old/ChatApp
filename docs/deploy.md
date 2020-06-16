# Deploy guide

- Update Apt: `sudo apt update`
- Install from apt-get: `sudo apt-get install python3-pip python-dev libpq-dev postgresql postgresql-contrib nginx supervisor redis-server`
- Install from pip: `sudo pip3 install psycopg2 virtualenv`
- Clone repo
- Move to project directory: `cd ChatApp`
- Create virtualenv: `virtualenv venv`
- Activate venv: `source venv/bin/activate`
- Install python dependences: `pip install -r requirements.txt`

- Run redis: `sudo systemctl enable redis-server.service`

Nginx
- `sudo ln config/nginx.conf /etc/nginx/sites-enabled`
- `sudo service nginx restart`

Npm
- `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`
- reopen terminal
- `nvm install node`
- `nvm install --lts`

React
- `npm run build-production`
- `python manage.py collectstatic`

Postgres
- `sudo su - postgres`
- `createuser --interactive -P`
- `createdb --owner db_user django_db`
- `python manage.py makemigration`
- `python manage.py migrate`


Supervisor
- `sudo update-rc.d supervisor enable`
- `sudo rm /etc/supervisor/conf.d/supervisor.conf`
- `sudo ln config/supervisor.conf /etc/supervisor/conf.d/supervisor.conf`
- `sudo supervisorctl reread`
- `sudo supervisorctl update`
- `sudo supervisorctl status myproject`

Server logs:
- Nginx: `vim /var/log/nginx/`
- Daphne: `vim /var/log/myproject.log`