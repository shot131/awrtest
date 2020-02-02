**Локальная разработка**  
Установить в системе virtualbox и vagrant  
Из корневого каталога запустить **vagrant up**  

**Установка пакетов для frontend части**  
cd frontend-app  
yarn install 

**Сборка frontend**  
cd frontend-app
npx gulp --production --deploy  
Одновременно будет запущен сервер для локальной разработки и file watcher, сборик будет запускаться автоматически при изменениях файлов.

**Установка пакетов для virtualenv**  
pipenv install из корневого каталога проекта

**Заупуск gunicorn на production сервере**  
Перейти в домашний каталог проекта (cd /home/username/www)    
pipenv run gunicorn awrtest.wsgi:application --pythonpath=/home/shot131/www/awrtest --name awrtest --workers 2 --user=username --group=username --bind=127.0.0.1:8080 --daemon