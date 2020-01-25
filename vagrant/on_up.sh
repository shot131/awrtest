#!/usr/bin/env bash
sed -i -e "s/^127.0.1.1\t$SITE_URL.*$/$HOST_IP www.$SITE_URL $SITE_URL $SITE_NAME/g" /etc/hosts
cd /vagrant/
pipenv install
service mysql restart