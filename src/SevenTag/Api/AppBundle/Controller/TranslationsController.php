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

namespace SevenTag\Api\AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class TranslationsController
 * @package SevenTag\AppBundle\Controller
 */
class TranslationsController extends RestController
{
    /**
     * @Rest\Get("/translations")
     * @Rest\View()
     *
     * @return array
     */
    public function indexAction()
    {
        return $this->get('seven_tag.language.language_provider')->getLanguages();
    }

    /**
     * @Rest\Get("/translations/{lang}")
     * @Rest\View()
     * @param string $lang
     * @return Response
     */
    public function getAction($lang)
    {
        $locale = $this->get('seven_tag.locale.locale_provider')->getLocale($lang);

        if (is_null($locale)) {
            throw new \LogicException(
                sprintf('The file for %s language was not found', $lang)
            );
        }

        return $locale;
    }
}
