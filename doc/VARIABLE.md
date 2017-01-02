# Instruction for create plugin which is responsible for adding new variable type

###1. Generate bundle skeleton from symfony

```
bin/console generate:bundle --namespace=SevenTag/Plugin/TestBundle --dir
```

with options:<br>
Bundle name [*SevenTagPluginTestBundle*]:<br>
Configuration format (yml, xml, php, or annotation): yml<br>
Do you want to generate the whole directory structure [no]?<br>
Do you confirm generation [*yes*]?<br>
Confirm automatic update of your Kernel [yes]? no<br>
Confirm automatic update of the Routing [yes]? no<br>

Starting bundle should look like:

```
TestBundle\
  DependencyInjection\
    Configuration.php
    SevenTagPluginTestExtension.php
  Resources\
    config\
      services.yml
  Tests\
  SevenTagPluginTestBundle.php
```
###2. Extend SevenTagPluginTestBundle.php with class
```
SevenTag\Api\AppBundle\Plugin\PluginAwareBundle
```
###3. Create directories in Resources
```
Resorces\
  public\
    js\
    html\
```
###4. Create javascript file with configuration variable type in container, for example:
```
//public/js/newVariableTypeConfiguration.js
var config = function ($collectorProvider) {
    $collectorProvider
        .add('newVariableType', function () {
            return Math.random();
        });
};
config.$inject = [
    '$collectorProvider'
];
 
sevenTag.config(config);
```
###5. Create variable type configuration file for admin panel form
```
(function () {
    'use strict';
 
    var MODULE_NAME = 'admin.application';
 
    angular
        .module(MODULE_NAME)
        .run([
 
            'clearcode.tm.variable.$variableForm',
 
            function ($variableFormProvider) {
 
                $variableFormProvider
                    .addType('newVariableType', {
                        templateUrl: '../bundles/seventagplugintest/html/newVariableType.html'
                    });
 
            }
        ])
}());
```
###6. Create html template to configure variable type form public/html
if we do not need form for variable type

```html
<div class="alert alert-success">
  <p translate="No configuration needed"></p>
</div>
```
if we need

```html
<div ng-class="{'has-error': (variableForm.value.$dirty &amp;&amp; variableForm.value.$invalid) || (view.validateVariable &amp;&amp; variableForm.value.$error.required) || variableForm.value.$error.value, 'has-feedback': (variableForm.value.$dirty &amp;&amp; variableForm.value.$invalid) || (view.validateVariable &amp;&amp; variableForm.value.$error.required)}" class="form-group">
  <label class="control-label">{{'Value'|translate}} <span class="important">*</span></label>
  <input type="text" name="value" ng-model="view.variable.value" ng-keypress="variableForm.value.$error.value !== undefined ? variableForm.value.$error = {} : ''" class="form-control" id="constant-variable-value" ng-required="true" ng-disabled="!currentContainer.$container.hasPermission('edit')"/><span ng-if="(undefined.$submitted &amp;&amp; undefined.viewAuthPassword.$invalid)" class="form-control-feedback icon-close"></span>
  <div id="constant-variable-value-validation-message" ng-show="(variableForm.value.$error.required &amp;&amp; variableForm.value.$dirty) || (view.validateVariable &amp;&amp; variableForm.value.$error.required)">
    <p translate="Required" class="error"></p>
  </div>
  <div id="undefined-validation-message" ng-show="variableForm.value.$error.value">
    <p ng-repeat="error in variableForm.value.$error.value" class="error">{{ error }}</p>
  </div>
</div>
```

###7. Create listener for symfony which is responsible for adding new variable type from backend side

```
<?php
 
namespace SevenTag\Plugin\TestBundle\Listener;
 
use SevenTag\Api\VariableBundle\Event\LoadVariableTypeEvent;
use SevenTag\Component\Variable\Model\VariableType;
 
class AddNewVariableListener
{
    public function onRun(LoadVariableTypeEvent $event)
    {
        $event->getVariableTypeCollection()->set(
            'newVariableType',
            new VariableType('newVariableType', 'New variable type', 'New variable type', 'New variable type')
        );
    }
}
```

```
services:
    seven_tag_variable.add_test_variable_listener:
        class: SevenTag\Plugin\TestBundle\Listener\AddNewVariableListener
        tags:
          - { name: kernel.event_listener, event: load_variables_type, method: onRun }
```

###8. Create manifest.json in main bundle directory

```
{
  "name": "seventag_plugin_new_variable",
  "version": "1.0.0",
  "assets-js": [
    {"path": "js/newVariableTypeForm.js", "target": "bottom", "externalPath": false}
  ],
  "containerjs-configs": [
    {"path": "js/newVariableTypeConfiguration.js"}
  ]
}
```

###9. Clear the cache and install asset

```
bin/console c:c --env=prod
bin/console a:i
gulp build
```

You should see in admin panel new variable type

![](/doc/variable_view.png)

Here you can download plugin source [TestBundle.zip](/doc/TestBundle.zip)



