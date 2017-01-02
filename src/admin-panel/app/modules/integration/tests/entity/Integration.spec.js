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

/* global describe: false, jasmine: false, beforeEach: false, it: false, expect: false */

describe('Unit: Integration entity', () => {
    var integrationResource, integration;

    beforeEach(angular.mock.module('clearcode.tm.integration'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.integration.IntegrationResource',
        (_integrationResource) => {
            integrationResource = _integrationResource;
            integration = integrationResource.getEntityObject();

            spyOn(integrationResource, 'put');
            spyOn(integrationResource, 'post');
            spyOn(integrationResource, 'delete');
        }
    ]));

    it('should be defined', () => {
        expect(integration).toBeDefined();
    });

    describe('when call save method', () => {
        it('should call put method of resource when id is defined', () => {
            integration.id = 44;
            integration.user = {
                email: 'user1@example.com'
            };

            integration.save();

            expect(integrationResource.put).toHaveBeenCalled();
        });

        it('should call post method of resource when id is defined', () => {
            integration.user = {
                email: 'user1@example.com'
            };

            integration.save();

            expect(integrationResource.post).toHaveBeenCalled();
        });
    });

    describe('when call remove method', () => {
        it('should call delete method of resource when id is defined', () => {
            integration.id = 44;

            integration.remove();

            expect(integrationResource.delete).toHaveBeenCalled();
        });

        it('should not call delete method of resource when id is not defined', () => {
            integration.remove();

            expect(integrationResource.delete).not.toHaveBeenCalled();
        });
    });
});
