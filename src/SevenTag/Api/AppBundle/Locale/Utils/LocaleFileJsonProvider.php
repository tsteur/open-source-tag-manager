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

namespace SevenTag\Api\AppBundle\Locale\Utils;

use SevenTag\Api\AppBundle\Locale\Utils\LocaleFileParsingException as LocaleFileParsingException;

/**
 * Class LocaleFileJsonProvider
 * @package SevenTag\Api\AppBundle\Locale\Utils
 */
class LocaleFileJsonProvider
{

    /**
    * @param $localeFileContent
    * @return mixed
    */
    public static function getParsedJson($localeFilePath, $localeFileContent)
    {
        $localeJson = json_decode($localeFileContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new LocaleFileParsingException($localeFilePath->getPathname());
        }

        return $localeJson;
    }
}
