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

var scenario = require('../lib/scenario');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = function () {

    scenario.use(this);

    scenario.define(
        /^I should see helper about "(.*)"$/,
        function (option, callback) {

            var infoButton;
                    switch (option) {
                        case 'container_header':
                            infoButton = 'h2.page-header i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;
                        case 'container_id':
                            infoButton = 'th.sortable i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;
                        case 'tags_header':
                            infoButton = 'h2.page-header i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;
                        case 'triggers':
                            infoButton = 'div.sortable:nth-of-type(4) i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;
                        case 'tag_html':
                            infoButton = 'div.form-group label.control-label i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;
                        case 'fires_on':
                            infoButton = 'div.stepper-step:nth-of-type(1) div.form-group i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;
                        case 'loads_on':
                            infoButton = 'div.ng-scope div.row.ng-scope div.panel.panel-default div.panel-body div div.stepper-step div.stepper-subform.ng-scope form.ng-pristine.ng-isolate-scope.ng-invalid.ng-invalid-required div.stepper-step div.form-group div.row div.col-md-12 i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;
                        case 'conditions':
                            infoButton = 'div.stepper-subform.ng-scope form.ng-pristine.ng-isolate-scope.ng-invalid.ng-invalid-required div.stepper-step div.form-group label.control-label i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;
                        case 'triggers_header':
                            infoButton = 'h2.page-header i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;
                        case 'tag_type':
                            infoButton = 'div.sortable:nth-of-type(3) i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;
                        case 'type':
                            infoButton = 'tr.ng-scope th.sortable:nth-of-type(2) i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;
                        case 'tags':
                            infoButton = 'tr.ng-scope th.sortable:nth-of-type(3) i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;
                        case 'container_code':
                            infoButton = 'div.form-group i.help-tooltip.ng-isolate-scope.icon-info-circle';
                            break;

                    }


            var clickHelperPromise = scenario.context(
                /^I click "(.*)" element$/,
                infoButton

            );

            clickHelperPromise.then(function () {

                callback();

            });

        }
    );



};
