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

namespace SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Handler;

use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context;

class ContainerJsHandler implements HandlerInterface
{
    private $domain;

    public function __construct($domain)
    {
        $this->domain = $domain;
    }

    public function handle(Context $context)
    {
        $content = str_replace(
            '##id##',
            $context->getContainer()->getAccessId(),
            $context->getContent()
        );

        $content = str_replace('##domain##', $this->domain, $content);
        $content = str_replace('##host##', $this->domain . '/container-debugger', $content);
        $content = str_replace('##delay##', $context->getContainer()->getDelay(), $content);

        $context->setContent($content);
    }
}
