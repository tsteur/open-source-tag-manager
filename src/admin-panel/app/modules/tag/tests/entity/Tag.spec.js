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
    var tagResource, tag;

    beforeEach(angular.mock.module('clearcode.tm.tag'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.tag.tagResource',
        (_tagResource_) => {
            tagResource = _tagResource_;

            tag = tagResource.getEntityObject();

            spyOn(tagResource, 'put');
            spyOn(tagResource, 'post');
            spyOn(tagResource, 'delete');
        }
    ]));

    it('should be defined', () => {
        expect(tag).toBeDefined();
    });

    describe('when call addTrigger method', () => {
        it('should add Trigger into array properly', () => {
            var trigger = {
                trigger: 'test2'
            };

            tag.triggers = [
                {
                    trigger: 'test1'
                }
            ];

            tag.addTrigger(trigger);

            expect(tag.triggers.length).toBe(2);
        });
    });

    describe('when call editTrigger method', () => {
        it('should edit specific trigger in array', () => {
            var trigger = {
                id: 2,
                trigger: 'test4'
            };

            tag.triggers = [
                {
                    id: 1,
                    trigger: 'test1'
                },
                {
                    id: 2,
                    trigger: 'test2'
                },
                {
                    id: 3,
                    trigger: 'test3'
                }
            ];

            tag.editTrigger(trigger);

            expect(tag.triggers.length).toBe(3);
            expect(tag.triggers[1].trigger).toBe('test4');
        });
    });

    describe('when call removeTrigger method', () => {
        it('should remove specific trigger in array', () => {
            var trigger1 = 'test2';

            var trigger2 = 'test4';

            tag.triggers = ['test1', 'test2', 'test3'];

            var removed1 = tag.removeTrigger(trigger1);
            var removed2 = tag.removeTrigger(trigger2);

            expect(removed1).toBeTruthy();
            expect(removed2).toBeFalsy();

            expect(tag.triggers.length).toBe(2);
            expect(tag.triggers[0]).toBe('test1');
            expect(tag.triggers[1]).toBe('test3');
        });
    });

    describe('when call removeTrigger method', () => {
        it('should remove specific trigger in array', () => {
            tag.triggers = [
                {
                    id: 1,
                    trigger: 'test1'
                },
                {
                    id: 2,
                    trigger: 'test2'
                },
                {
                    id: 3,
                    trigger: 'test3'
                }
            ];

            var removed1 = tag.removeTriggerById(2);
            var removed2 = tag.removeTriggerById(4);

            expect(removed1).toBeTruthy();
            expect(removed2).toBeFalsy();

            expect(tag.triggers.length).toBe(2);
            expect(tag.triggers[0].trigger).toBe('test1');
            expect(tag.triggers[1].trigger).toBe('test3');
        });
    });

    describe('when call save method', () => {
        it('should call put method of resource when id is defined', () => {
            tag.id = 15;
            tag.save();

            expect(tagResource.put).toHaveBeenCalled();
        });

        it('should call post method of resource when id is defined', () => {
            tag.save();

            expect(tagResource.post).toHaveBeenCalled();
        });
    });

    describe('when call remove method', () => {
        it('should call delete method of resource when id is defined', () => {
            tag.id = 15;
            tag.remove();

            expect(tagResource.delete).toHaveBeenCalled();
        });

        it('should not call delete method of resource when id is not defined', () => {
            tag.remove();

            expect(tagResource.delete).not.toHaveBeenCalled();
        });
    });
});
