Заупстить gunicorn  
cd /vagrant  
pipenv run gunicorn awrtest.wsgi:application --pythonpath=/home/shot131/www/awrtest --name awrtest --workers 2 --user=shot131 --group=shot131 --bind=213.219.214.58:8080 --daemon

Рестарт gunicorn  
ps aux | grep gunicorn | grep laudatours | awk '{ print $2 }' | xargs kill -HUP