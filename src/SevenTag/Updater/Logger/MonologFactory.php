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

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Processor\MemoryUsageProcessor;
use Monolog\Processor\UidProcessor;

/**
 * Class MonologFactory
 * @package SevenTag\Updater\Logger
 */
class MonologFactory implements LoggerFactoryInterface
{
    /**
     * @var string
     */
    private $filePath;

    /**
     * @var int
     */
    private $level = Logger::DEBUG;

    /**
     * @var string
     */
    private $loggerName = 'updater';

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->filePath = $this->recognizeLogsDirectory().'/updater.log';
    }

    /**
     * {@inheritdoc}
     */
    public function createLogger()
    {
        $logger = new Logger($this->loggerName);
        $logger->pushHandler(new StreamHandler($this->filePath, $this->level));

        $logger->pushProcessor(new MemoryUsageProcessor());
        $logger->pushProcessor(new UidProcessor());

        return $logger;
    }

    /**
     * {@inheritdoc}
     */
    public function setFilePath($filePath)
    {
        $this->filePath = $filePath;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function setLevel($level)
    {
        $this->level = (int)$level;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function setLoggerName($loggerName)
    {
        $this->loggerName = $loggerName;

        return $this;
    }

    /**
     * @return string
     */
    protected function recognizeLogsDirectory()
    {
        return is_dir(__DIR__.'/../../../../var/logs') ? __DIR__.'/../../../../var/logs' : __DIR__.'/../../../../app/logs';
    }
}
