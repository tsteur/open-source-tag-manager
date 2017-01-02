#!/usr/bin/env bash

php bin/console cache:clear --env=prod --no-interaction

if [ -f "updater.tar.gz" ]
then
  rm updater.tar.gz
fi

if [ -f "updater.phar" ]
then
  rm updater.phar
fi

wget http://download.7tag.org/updater.tar.gz
tar -xf updater.tar.gz

php updater.phar update

php bin/console cache:clear --env=prod --no-interaction
php bin/console doctrine:migrations:migrate --env=prod --no-interaction
php bin/console seventag:republish --env=prod --no-interaction