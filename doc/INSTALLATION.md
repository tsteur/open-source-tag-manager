# Installation guide

At first clone repository from github:
```
git clone git@github.com:tsteur/open-source-tag-manager.git
```

Then configure server and project the same way as usual Symfony project.
More instructions are available in official symfony [documentation](http://symfony.com/doc/current/book/installation.html).  
You can also check if your machine meets [minimal requirements](https://7tag.org/docs/software-requirements/).

**Remember to set up permissions for `var/cache`, `var/logs`, `/var/spool` and `/web/containers`.**

Symfony vendors and frontend dependencies can be installed easily by ant task:
```
ant build
```

At the end rebuild frontend:
```
gulp build
```

This command builds whole application including backend and frontend.
In next step create database and edit `app/config/parameters.yml`:
```
parameters:
  database_driver: pdo_mysql
  database_host: 127.0.0.1
  database_port: null
  database_name: <database_name>
  database_user: <user>
  database_password: <password>
```

Create database schema:
```
bin/console doctrine:schema:create
```

At the end load data fixtures in order to work on prepared data examples.
```
php bin/console doctrine:fixtures:load
```

Data fixtures provides default user with following credentials:
```
login: user1@example.com
password: testing
```
