## Quick Start
---
- Clone Repo: `git clone https://github.com/nikifkon/ChatApp.git`
- Go to project folder: `cd ChatApp`
- Activate Virtualenv(optional):  `pip install virtualenv`
  - Create venv: `virtualenv venv`
  - Activate : `venv\Scripts\activate`(On Windows)
- Install python dependences `pip install -r requirements.txt`
  - also install pywin32, if you on windows
- Install node.js dependences `npm install`
  - if you will get error, try this: `npm cache clean --force`
- Run Django dev Server: `python manage.py runserver`
- In new window, run Webpack hot-reload server: `npm run watch`

## Django
- **make migrations**:
<code>
python manage.py makemigrations dialogs groups users socket_chat
</code>

- **run tests**:
<code>pytest</code>

## Documentation
see [api](docs/api.md)

## Deploy
see [deploy](docs/deploy.md)