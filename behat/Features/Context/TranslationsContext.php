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

namespace Features\Context;

/**
 * Class TagTemplatesContext
 * @package Features\Context
 */
class TranslationsContext extends BaseContext
{
    private $jsonContent;

    /**
     * @When I request about :lang file
     * @param string $lang
     */
    public function iRequestAboutFile($lang)
    {
        $client = $this->getClient();

        $client->request(
            'GET',
            sprintf('/api/translations/%s', $lang)
        );

        $this->jsonContent = $client->getResponse()->getContent();
    }

    /**
     * @Then I should get json file with all translations
     */
    public function iShouldGetJsonFileWithAllTranslations()
    {
        $translationArray = json_decode($this->jsonContent, true);

        $this->assertResponseContainsJson($translationArray);
    }

    /**
     * @Then I should get exception about not found translation file
     */
    public function iShouldGetExceptionAboutNotFoundTranslationFile()
    {
        $this->assertResponseStatusCode(500);
    }
}
