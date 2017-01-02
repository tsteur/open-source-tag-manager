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

@set_time_limit(0);
@ini_set('memory_limit', '-1');

require_once __DIR__ . '/../vendor/autoload.php';

use SevenTag\Updater\Authenticator\Authenticator;
use SevenTag\Updater\Environment\Bootstrap;
use SevenTag\Updater\HttpRequestChecker\HttpRequestChecker;
use SevenTag\Updater\SessionProvider\SessionProvider;
use SevenTag\Updater\Updater;
use SevenTag\Updater\Step;
use SevenTag\Updater\Utils\NewestVersionChecker;
use SevenTag\Updater\Utils\DomainProvider;
use SevenTag\Updater\Utils\NewestInstancePreparator;
use SevenTag\Updater\Utils\GuzzleDownloader;
use SevenTag\Updater\Utils\GuzzleClientFactory;
use SevenTag\Updater\Step\CopyNewestToCurrentInstanceStep;
use SevenTag\Updater\CopyStrategy\FilesystemCopyStrategy;
use Symfony\Component\HttpFoundation\Request;

$sessionProvider = new SessionProvider();
$httpRequestChecker = new HttpRequestChecker(new Authenticator($sessionProvider->getSession()));
$request = Request::createFromGlobals();

if (!$httpRequestChecker->checkHttpRequest($request, true)) {
    $fallbackResponse = $httpRequestChecker->getFallbackResponse();
    $fallbackResponse->send();
    return;
}

$bootstrap = new Bootstrap(
    __DIR__ . '/..',
    sys_get_temp_dir() . uniqid('7tag_updater', true) . DIRECTORY_SEPARATOR . 'seventag'
);
$bootstrap->bootstrap();

$clientFactory = new GuzzleClientFactory();

$holder = new Step\Holder();
$holder->add(new Step\CacheWarmupStep());
$holder->add(new Step\MigrationsMigrateStep());
$holder->add(new Step\RepublishContainerStep());
$holder->add(new Step\RestoreHtaccessStep());
$holder->add(new Step\RedirectStep('/'));

$updater = new Updater($holder, $bootstrap->getEnvironment());
$updater->update();

$bootstrap->finish();
