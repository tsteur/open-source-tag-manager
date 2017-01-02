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


describe('Unit: Tag entity', () => {
    var triggerResource, trigger;

    beforeEach(angular.mock.module('clearcode.tm.trigger'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.trigger.triggerResource',
        (_tagResource_) => {
            triggerResource = _tagResource_;

            trigger = triggerResource.getEntityObject();

            spyOn(triggerResource, 'put');
            spyOn(triggerResource, 'post');
            spyOn(triggerResource, 'delete');
        }
    ]));

    it('should be defined', () => {
        expect(trigger).toBeDefined();
    });

    describe('when call addCondition method', () => {
        it('should add Condition into array properly', () => {
            var condition = {
                condition: 'test2'
            };

            trigger.conditions = [
                {
                    condition: 'test1'
                }
            ];

            trigger.addCondition(condition);

            expect(trigger.conditions.length).toBe(2);
        });
    });

    describe('when call removeCondition method', () => {
        it('should remove specific condition in array', () => {
            trigger.conditions = ['test1', 'test2', 'test3'];
            trigger.removeCondition(1);

            expect(trigger.conditions.length).toBe(2);
            expect(trigger.conditions[0]).toBe('test1');
            expect(trigger.conditions[1]).toBe('test3');
        });
    });

    describe('when call save method', () => {
        it('should call put method of resource when id is defined', () => {
            trigger.id = 15;
            trigger.save();

            expect(triggerResource.put).toHaveBeenCalled();
        });

        it('should call post method of resource when id is defined', () => {
            trigger.save();

            expect(triggerResource.post).toHaveBeenCalled();
        });
    });

    describe('when call remove method', () => {
        it('should call delete method of resource when id is defined', () => {
            trigger.id = 15;
            trigger.remove();

            expect(triggerResource.delete).toHaveBeenCalled();
        });

        it('should not call delete method of resource when id is not defined', () => {
            trigger.remove();

            expect(triggerResource.delete).not.toHaveBeenCalled();
        });
    });
});
