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

namespace SevenTag\Updater\Environment;

use Monolog\ErrorHandler;
use Monolog\Formatter\HtmlFormatter;
use Monolog\Logger;
use SevenTag\Updater\Instance\LocalInstance;
use SevenTag\Updater\Logger\MonologFactory;
use SevenTag\Updater\Logger\ResponseHandler;
use Symfony\Bridge\Monolog\Formatter\ConsoleFormatter;
use Symfony\Bridge\Monolog\Handler\ConsoleHandler;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Debug\Debug;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Class Bootstrap
 * @package SevenTag\Updater\Environment
 */
class Bootstrap
{
    /**
     * @var string
     */
    protected $currentInstancePath;

    /**
     * @var string
     */
    protected $newestInstancePath;

    /**
     * @var boolean
     */
    protected $isBootstrapped = false;

    /**
     * @var Logger
     */
    protected $logger;

    /**
     * @var Response
     */
    protected $response;

    /**
     * @var ConsoleOutput
     */
    protected $consoleOutput;

    /**
     * @var EnvironmentInterface
     */
    protected $environment;

    /**
     * @param string $currentInstancePath
     * @param string $newestInstancePath
     */
    public function __construct($currentInstancePath, $newestInstancePath)
    {
        $this->currentInstancePath = $currentInstancePath;
        $this->newestInstancePath = $newestInstancePath;
    }

    public function bootstrap()
    {
        if ($this->isBootstrapped()) {
            return $this;
        }

        $this->bootstrapLoggerAndErrorHandler();
        $this->bootstrapEnvironment();

        $this->isBootstrapped = true;

        return $this;
    }

    /**
     * @return bool
     */
    public function isBootstrapped()
    {
        return $this->isBootstrapped;
    }

    /**
     * @return EnvironmentInterface
     */
    public function getEnvironment()
    {
        if (!$this->isBootstrapped()) {
            $this->bootstrap();
        }

        return $this->environment;
    }

    /**
     * Finish bootstrap and clean up stuff.
     */
    public function finish()
    {
        if ($this->response instanceof Response) {
            $this->response->send();
        }
    }

    protected function bootstrapCli()
    {
        $this->consoleOutput = new ConsoleOutput();
        $this->consoleOutput->setVerbosity(OutputInterface::VERBOSITY_DEBUG);

        $handler = new ConsoleHandler($this->consoleOutput);
        $handler->setLevel(Logger::DEBUG);
        $handler->setFormatter(new ConsoleFormatter());

        $this->logger->pushHandler($handler);
    }

    protected function bootstrapHttp()
    {
        $this->response = new StreamedResponse(function () {
            ob_flush();
            flush();
        });

        $responseHandler = new ResponseHandler();
        $responseHandler->setResponse($this->response);
        $responseHandler->setFormatter(new HtmlFormatter());

        $this->logger->pushHandler($responseHandler);
    }

    protected function bootstrapLoggerAndErrorHandler()
    {
        Debug::enable(-1, true);

        $loggerFactory = new MonologFactory();
        $loggerFactory->setLevel(Logger::DEBUG);

        $this->logger = $loggerFactory->createLogger();

        ErrorHandler::register($this->logger);

        if (php_sapi_name() === "cli") {
            $this->bootstrapCli();
        } else {
            $this->bootstrapHttp();
        }
    }

    protected function bootstrapEnvironment()
    {
        if (is_null($this->environment)) {
            $this->environment = new Environment(
                new LocalInstance($this->currentInstancePath),
                new LocalInstance($this->newestInstancePath),
                $this->logger
            );
        }
    }
}
