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

describe('Unit: Website entity', () => {
    var websiteResource, website;

    beforeEach(angular.mock.module('clearcode.tm.debug'));
    beforeEach(angular.mock.inject([
        'clearcode.tm.debug.websiteResource',
        (_websiteResource_) => {
            websiteResource = _websiteResource_;

            website = websiteResource.getEntityObject();
        }
    ]));

    it('should be defined', () => {
        expect(website).toBeDefined();
    });

    describe('when call hasUrl method', () => {
        it('should return false if url is not valid', () => {
            website.url = undefined;
            var hasUrl = website.hasUrl();

            expect(hasUrl).toBe(false);
        });

        it('should return false if url is empty', () => {
            website.url = '';
            var hasUrl = website.hasUrl();

            expect(hasUrl).toBe(false);
        });

        it('should return false if url dose not have at least 10 chars', () => {
            website.url = 'http://ex';
            var hasUrl = website.hasUrl();

            expect(hasUrl).toBe(false);
        });

        it('should return true if url is valid', () => {
            website.url = 'http://example.com';
            var hasUrl = website.hasUrl();

            expect(hasUrl).toBe(true);
        });
    });

    describe('when call getSeparator method', () => {
        it('should return query parameter', () => {
            var separator = website.getSeparator();

            expect(separator).toBe('?');
        });

        it('should return hash parameter', () => {
            website.parameterType = 1;
            var separator = website.getSeparator();

            expect(separator).toBe('#');
        });

        it('should return query parameter if url not contain it', () => {
            website.url = 'http://example.com';
            website.parameterType = 0;
            var separator = website.getSeparator();

            expect(separator).toBe('?');
        });

        it('should return dash parameter if url not contain it', () => {
            website.url = 'http://example.com';
            website.parameterType = 1;
            var separator = website.getSeparator();

            expect(separator).toBe('#');
        });

        it('should return ampersand parameter if url contain already hash parameter', () => {
            website.url = 'http://example.com/#test';
            website.parameterType = 1;
            var separator = website.getSeparator();

            expect(separator).toBe('&');
        });

        it('should return ampersand parameter if url contain already query parameter', () => {
            website.url = 'http://example.com/?test';
            website.parameterType = 0;
            var separator = website.getSeparator();

            expect(separator).toBe('&');
        });
    });

    describe('when call getUrlWithParameter method', () => {
        it('should return empty string is url is empty', () => {
            website.url = '';
            var urlWithParameter = website.getUrlWithParameter();

            expect(urlWithParameter).toBe('');
        });

        it('should add hash parameter', () => {
            website.url = 'http://7tag.dev.clearcode.cc';
            website.parameterType = 1;
            var urlWithParameter = website.getUrlWithParameter();

            expect(urlWithParameter).toBe(`${website.url}#_stg_debug`);
        });

        it('should add query parameter', () => {
            website.url = 'http://7tag.dev.clearcode.cc';
            website.parameterType = 0;
            var urlWithParameter = website.getUrlWithParameter();

            expect(urlWithParameter).toBe(`${website.url}?_stg_debug`);
        });

        it('should concat query parameters', () => {
            website.url = 'http://7tag.dev.clearcode.cc?a=1&b=2';
            website.parameterType = 0;
            var urlWithParameter = website.getUrlWithParameter();

            expect(urlWithParameter).toBe(`${website.url}&_stg_debug`);
        });

        it('should concat hash parameters', () => {
            website.url = 'http://7tag.dev.clearcode.cc#a=1&b=2';
            website.parameterType = 1;
            var urlWithParameter = website.getUrlWithParameter();

            expect(urlWithParameter).toBe(`${website.url}&_stg_debug`);
        });
    });
});
