#!/usr/bin/env bash
apt-get update -y && apt-get upgrade -y
apt-get install -y curl build-essential checkinstall software-properties-common tmux screen apt-transport-https lsb-release ca-certificates wget nano zip unzip mc openssl
apt-get install -y  libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev
service sshd restart

cd /opt
wget https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tgz
tar xzf Python-3.8.1.tgz
cd Python-3.8.1
./configure --enable-optimizations
make altinstall
cd /opt
rm -f Python-3.8.1.tgz
apt-get install python3-pip -y
pip3.8 install pipenv
mkdir -p /vagrant/.venv
if ! grep -q "export PIPENV_VENV_IN_PROJECT" /home/vagrant/.bashrc; then
  echo "export PIPENV_VENV_IN_PROJECT=1" >> /home/vagrant/.bashrc
  echo "export VIRTUALENV_ALWAYS_COPY=1" >> /home/vagrant/.bashrc
  source /home/vagrant/.bashrc
fi

debconf-set-selections <<< "mysql-server mysql-server/root_password password $MYSQL_PASSWORD"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $MYSQL_PASSWORD"
debconf-set-selections <<< "mysql-server-5.5 mysql-server/root_password password $MYSQL_PASSWORD"
debconf-set-selections <<< "mysql-server-5.5 mysql-server/root_password_again password $MYSQL_PASSWORD"
apt-get install -y mysql-server mysql-client mysql-common
update-rc.d mysql defaults
service mysql start
update-rc.d mysql enable
mysql -u root -p$MYSQL_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $MYSQL_DB_NAME;"
mysql -u root -p$MYSQL_PASSWORD -e "CREATE USER IF NOT EXISTS '$SITE_NAME'@'localhost' IDENTIFIED BY '$MYSQL_PASSWORD';"
mysql -u root -p$MYSQL_PASSWORD -e "GRANT ALL PRIVILEGES ON $MYSQL_DB_NAME.* TO '$SITE_NAME'@'localhost';"
mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql mysql