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
(function (window) {
    window.sevenTag.on('bootstrap', function () {
        if(window.sevenTag.debugOptions.enabled === false) {
            return;
        }

        function isMobile() {
            return window.innerWidth < 400 || window.innerHeight < 400;
        }

        function isMinimized() {
            return window.parent.stgDebuggerMinimized;
        }

        function isPortrait () {
            return window.innerWidth < window.innerHeight;
        }

        var htmlContent = <%= template %>; // eslint-disable-line

        var wrapper = window.document.createElement('DIV');

        function handleResolution () {
            if (isPortrait()) {
                wrapper.style.width = '100%';
                wrapper.style.height = isMinimized() ? '60px' : '100%';
                window.document.body.style['margin-top'] = '60px';
                wrapper.style['overflow-y'] = 'auto';
            } else {
                wrapper.style.width = isMinimized() ? '60px' : '400px';
                wrapper.style.height = '100%';
                wrapper.style.transition = 'width 1s';
                window.document.body.style['margin-top'] = '0px';
            }
        }

        window.onresize = function() {
            if (isMobile()) {
                handleResolution();
            }
        };

        handleResolution();

        wrapper.style.position = 'fixed';
        wrapper.style['-webkit-overflow-scrolling'] = 'touch';
        wrapper.style.zIndex = '2147483647';
        wrapper.style.right = 0;
        wrapper.style.top = 0;
        wrapper.id = 'seventag_container_debugger';

        var iframe = window.document.createElement('iframe');

        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.src = 'about:blank';

        wrapper.appendChild(iframe);

        window.document.body.appendChild(wrapper);

        var iframeDoc = iframe.contentWindow.document;

        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();

    });

}(window));
