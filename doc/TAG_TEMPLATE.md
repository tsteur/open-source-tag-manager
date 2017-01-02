# Custom Templates Technical Documentation

###Basic concept of 7tag pluggins

Plugins in 7tag are possible to obtain by adding additional Symfony2 bundles. We have only one requirement, bundle should implements `SevenTag\Api\AppBundle\Plugin\PluginInterface` or extends `SevenTag\Api\AppBundle\Plugin\PluginAwareBundle`.
This is necessary for retriving plugin manifest information. For example, in SevenTagPluginGoogleAnalyticsCustomTemplateBundle we extends `SevenTag\Api\AppBundle\Plugin\PluginAwareBundle` and add simple manifest.json file.
Manifest contains basic information about plugin like name, version and relative paths to assets that are dynamically passed to Angular application, for example:

<pre><code>{
  "name": "seventag_plugin_google_analytics_custom_template",
  "version": "1.0.0",
  "assets-js": [
    {"path": "/bundles/seventagplugingoogleanalyticscustomtemplate/js/stgGoogleAnalytics.js"}
  ]
}</code></pre>

Section "assets-js" contains paths to JavaScript scripts. They should be stored in bundles in <b>Resources\public</b> directory and installed by `bin/console assets:install` web command.

###Adding custom template

All you need to add custom template is implement special Symfony2 tagged service. More about tagged services you can read in Symfony2 [documentation](http://symfony.com/doc/current/components/dependency_injection/tags.html).<br>
Services tagged <b>seven_tag_tag_template_provider</b> are added to holder that keep all custom templates providers and dynamically add them to 7tag instance.<br>
Service should also implements `SevenTag\Api\TagBundle\Template\ProviderInterface` which contains four methods:

1. getKey - should return unique provider key (eq. google_adwords)
2. getFormType - should return `Symfony\Component\Form\FormTypeInterface` or string (tagged Symfony2 form type). Custom form type is responsible for validating additional template options before persist them in database.
3. generateCode - method is responsible for generating code before persisting `SevenTag\Component\Tag\Model\TagInterface` in database.
4. prePersist - methods is called before persisting `SevenTag\Component\Tag\Model\TagInterface` in database. 

On client side you must implement tag provider to tell Angular that your custom template exists, for example:

```
/**
 * Copyright (C) 2015 Digimedia Sp. z.o.o. d/b/a Clearcode
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
 
(function () {
    'use strict';
 
    var MODULE_NAME = 'admin.application.plugins';
    var TAG_MODULE = 'clearcode.tm.tag';
    var TEMPLATE_ID = 'google_adwords';
    var TEMPLATE_NAME = 'Google AdWords';
 
    angular
        .module(MODULE_NAME)
        .run([
            TAG_MODULE + '.$template',
            function ($templateProvider) {
 
                $templateProvider
                    .add(TEMPLATE_ID, TEMPLATE_NAME)
                    .addBrand('/bundles/seventagplugingoogleadwordscustomtemplate/img/gaw.svg')
                    .addType('conversion_tracking', 'Conversion tracking')
                        .addTextField({
                            name: 'conversionId',
                            label: 'Conversion ID',
                            placeholder: 'Set conversion id',
                            roles: {
                                required: true
                            }
                        })
                        .addTextField({
                            name: 'conversionLabel',
                            label: 'Conversion label',
                            placeholder: 'Set conversion label',
                            roles: {
                                required: true
                            }
                        })
                        .addHiddenField('remarketingOnly', false);
 
                $templateProvider
                    .get(TEMPLATE_ID)
                    .addType('remarketing', 'Remarketing')
                        .addTextField({
                            name: 'conversionId',
                            label: 'Conversion ID',
                            placeholder: 'Set conversion id',
                            roles: {
                                required: true
                            }
                        })
                        .addTextField({
                            name: 'conversionLabel',
                            label: 'Conversion label',
                            placeholder: 'Set conversion label',
                            roles: {
                                required: true
                            }
                        })
                        .addHiddenField('remarketingOnly', true);
 
            }
 
        ]);
 
}());
```
As you can see, we add to namespace admin.application.plugins new provider and inside provider code we configure provider by adding field and another options. 
