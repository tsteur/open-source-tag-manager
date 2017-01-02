#Docker usage

##Prepare project

###Remove:
    node_modules/
    bower_components/
    var/cache/prod
    vendor/

###Set database access in parameters.yml
    database_host: mysql
    database_port: null
    database_name: 7tag
    database_user: root
    database_password: root
    database_path: null

##Development
1. Add in `/etc/hosts` file line
    `100.0.0.210 7tag.dev`
2. Go to `docker/` directory
3. Run `vagrant up`, `vagrant ssh` and `cd /var/www/7tag/docker` if you are using mac osx or windows
4. Create network `docker network create -d bridge seventag_net`
5. Run `docker-compose build && docker-compose up -d`
6. Go to php container `docker exec -it php /bin/bash`
7. Run `ant build`
8. Run `bin/console d:s:u --force && bin/console d:m:m -n && bin/console d:f:l -n`

##Run e2e tests
1. Run `1. 2. 3. 4. 5.` tasks from development
2. Run `docker exec -it php ant e2e-selenium`

##Check screen after error on e2e tests:

1. Go to http://7tag.dev:4444/wd/hub/static/resource/hub.html
