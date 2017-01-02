FROM php:5.5.33-apache

RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get update && apt-get install -y php5-xdebug zip bzip2 ant nodejs git

COPY custom.ini /usr/local/etc/php/conf.d/

RUN docker-php-ext-install mbstring pdo_mysql opcache
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

COPY apache2.conf /etc/apache2/apache2.conf

RUN a2enmod rewrite
RUN a2enmod headers

WORKDIR /var/www/7tag
