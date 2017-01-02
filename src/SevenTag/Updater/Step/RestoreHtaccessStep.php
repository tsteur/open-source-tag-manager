<?php
/**
 * Copyright (C) 2015 Digimedia Sp. z o.o. d/b/a Clearcode
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

namespace SevenTag\Updater\Step;

use SevenTag\Updater\Environment\EnvironmentInterface;

/**
 * Class RestoreHtaccessStep
 *
 * This step will will be removed from 1.3.2 version.
 */
class RestoreHtaccessStep extends LocalInstanceStep
{
    protected function doPerform(EnvironmentInterface $environment)
    {
        $htaccess = <<<EOD
# Copyright (C) 2015 Digimedia Sp. z o.o. d/b/a Clearcode
#
# This program is free software: you can redistribute it and/or modify it under
# the terms of the GNU Affero General Public License as published by the Free
# Software Foundation, either version 3 of the License, or (at your option) any
# later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.

<IfModule mod_rewrite.c>
    RewriteEngine On

    RewriteCond %{HTTP:Authorization} ^(.*)
    RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]

    RewriteRule containers/(\d+)/noscript.html app.php [L]
    RewriteRule containers/tagtree/(\d+)\.jsonp app.php [L]

    RewriteRule containers/(\d+)/privacy app.php [L]

    RewriteRule api app.php [L]

    RewriteRule admin-tools/(.*) app.php [L]

    RewriteRule installer/(.*) installer/$1 [L]

    RewriteRule bundles/(.*) bundles/$1 [L]

    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule containers/(.*) containers/$1 [L]

    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule container-debugger/(.*) container-debugger/$1 [L]

    RewriteCond %{REQUEST_URI} ^/$
    RewriteRule .? admin-panel/index.php [L]

    <FilesMatch ".(eot|ttf|otf|woff)">
      Header set Access-Control-Allow-Origin "*"
    </FilesMatch>

    RewriteCond %{REQUEST_URI} !admin-panel
    RewriteCond %{REQUEST_URI} !container-debugger
    RewriteCond %{REQUEST_URI} !^/containers(.*)
    RewriteRule ((.*)\.(html|woff|ttf|eot|css|js|png|jpg|swf|ico|svg|map))$ admin-panel/$1 [L]

</IfModule>
EOD;

        $environment->getCurrentInstance()->getFilesystem()->put('web/.htaccess', $htaccess);
    }


    public function getDescription()
    {
        return 'Restore .htaccess file.';
    }
}
