# OS2sub - Subsites ondemand

## scripts setup
* pwgen package need to be installed
* /root/.my.cnf should be setup with the root password for mysql
* /usr/local/sbin/mysql-backup.sh is needed if you want backups before removing a subsite
* the using running the webserver need to be able to call the scripts with sudo right, create the rules in /etc/sudoers.d/subsites-www-data
* The scripts should only be writeable by root
* copy config.sh_SKEL to config.sh and change settings
* add .admin_password.txt

## main site setup
* install standard drupal in the /default folder
* drush en bc_subsites
* drush vset bc_subsites_script_dir /var/www/<site>/scripts
* drush vset bc_subsites_domain_suffix .subsites.xxxx.dk

## Purpose of using directories in project structure

- `profiles`
  - `os2sub`
    - `modules` - the main folder of shared functionality
      - `contrib` - contrib modules from drupal.org
    - `libraries` - drupal or 3rd party libraries
    - `themes` - the main folder of shared themes

- `sites`
  - `all`
    - `modules` - here shouldn't be any module,
      use `profiles/os2sub/modules` instead
    - `themes` - here shouldn't be any theme,
      use `profiles/os2sub/theme` instead
    - `libraries` - here shouldn't be any library,
      use `profiles/os2sub/libraries` instead
  - `example.com`
    - `modules` - site specific or overridden modules
      - `features` - site specific or overridden configuration

## Agreement of code committing

### Stable single base
To have ability simple raise up and configure new project we need
to have stable installation profile/distribution.

Based on that all common contrib/custom modules, libraries or themes
should be stored in `profiles/os2sub` folder.


### Reusing

In most of all cases, we are going to reuse existing modules and
functionality as much as possible. Regarding project configuration,
it means we have to **keep the same configuration** per project
to avoid overridden state of features between projects.

### Overrides and customization
In case when project/site has unique design solutions, custom
or configuration requirements it should be committed to site-specific
folder.

For overridden common configurations stored in feature modules
we have to carefully investigate the diff.

If there no no other way to avoid it we able to recreate feature with
overridden values and save to `example.com/modules/features` folder.

Per each overrides we have to **strongly and clearly realize** that
we will not have been able to share this configuration or custom changes.
