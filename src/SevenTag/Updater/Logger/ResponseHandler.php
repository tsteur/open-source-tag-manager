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

namespace SevenTag\Updater\Logger;

use Monolog\Handler\AbstractProcessingHandler;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Class ResponseHandler
 * @package SevenTag\Updater\Logger
 */
class ResponseHandler extends AbstractProcessingHandler
{
    /**
     * @var Response
     */
    private $response;

    /**
     * @param Response $response
     * @return $this
     */
    public function setResponse(Response $response)
    {
        $this->response = $response;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    protected function write(array $record)
    {
        if ($this->response instanceof StreamedResponse) {
            echo $record['formatted'];
            $this->response->sendContent();
        } else {
            $this->response->setContent($this->response->getContent().$record['formatted']);
        }
    }
}
