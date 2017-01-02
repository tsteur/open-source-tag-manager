#!/bin/sh
sudo apt-get update
# Expand max_nesting_level to prevent error
echo 'xdebug.max_nesting_level=1000' >> ~/.phpenv/versions/$(phpenv version-name)/etc/conf.d/travis.ini
# Prepare npm to work
npm install lru-cache sigmund
npm install -g uglify-js zeparser socket.io
# Set symfony configuration
cp app/config/parameters-ci.yml.dist app/config/parameters.yml
rm app/config/doctrine.yml
cp app/config/doctrine-ci.yml.dist app/config/doctrine.yml
# xvfb initialization for e2e tests to run firefox
export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start
ant composer-download
./bin/composer config -g github-oauth.github.com ${GITHUB_TOKEN}
