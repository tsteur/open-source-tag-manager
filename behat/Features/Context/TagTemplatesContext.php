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

use Behat\Gherkin\Node\TableNode;

/**
 * Class TagTemplatesContext
 * @package Features\Context
 */
class TagTemplatesContext extends BaseContext
{
    /**
     * @When I add Google Adwords custom template tag to container :id
     */
    public function iAddGoogleAdwordsCustomTemplateTagToContainer($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/tags', $id),
            [
                'name' => $table->getRow(1)[0],
                'template' => 'google_adwords',
                'templateOptions' => [
                    'conversionId' => $table->getRow(1)[1],
                    'conversionLabel' => $table->getRow(1)[2],
                    'remarketingOnly' => filter_var($table->getRow(1)[3], FILTER_VALIDATE_BOOLEAN) ? true : false,
                    'type' => $table->getRow(1)[4],
                ]
            ]
        );
    }

    /**
     * @When I add Google Analytics custom template tag to container :id
     */
    public function iAddGoogleAnalyticsCustomTemplateTagToContainer($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/tags', $id),
            [
                'name' => $table->getRow(1)[0],
                'template' => 'google_analytics',
                'templateOptions' => [
                    'id' => $table->getRow(1)[1]
                ]
            ]
        );
    }

    /**
     * @When I add Optimizely custom template tag to container :id
     */
    public function iAddOptimizelyCustomTemplateTagToContainer($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/tags', $id),
            [
                'name' => $table->getRow(1)[0],
                'template' => 'optimizely',
                'templateOptions' => [
                    'projectId' => $table->getRow(1)[1]
                ]
            ]
        );
    }

    /**
     * @When I add Visual Website Optimizer custom template tag to container :id
     */
    public function iAddVisualWebsiteOptimizerCustomTemplateTagToContainer($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/tags', $id),
            [
                'name' => $table->getRow(1)[0],
                'template' => 'visual_website_optimizer',
                'templateOptions' => [
                    'accountId' => $table->getRow(1)[1]
                ]
            ]
        );
    }

    /**
     * @When I add Piwik custom template tag to container :id
     */
    public function iAddPiwikCustomTemplateTagToContainer($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/tags', $id),
            [
                'name' => $table->getRow(1)[0],
                'template' => 'piwik',
                'templateOptions' => [
                    'piwikSiteId' => $table->getRow(1)[1],
                    'piwikUrl' => $table->getRow(1)[2],
                ]
            ]
        );
    }

    /**
     * @When I add CrazyEgg custom template tag to container :id
     */
    public function iAddCrazyEggCustomTemplateTagToContainer($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/tags', $id),
            [
                'name' => $table->getRow(1)[0],
                'template' => 'crazy_egg',
                'templateOptions' => [
                    'accountNumber' => $table->getRow(1)[1]
                ]
            ]
        );
    }


    /**
     * @When I add FacebookRetargetingPixel custom template tag to container :id
     */
    public function iAddFacebookRetargetingPixelCustomTemplateTagToContainer($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/tags', $id),
            [
                'name' => $table->getRow(1)[0],
                'template' => 'facebook_retargeting_pixel',
                'templateOptions' => [
                    'pixelId' => $table->getRow(1)[1],
                    'event' => $table->getRow(1)[2]
                ]
            ]
        );
    }

    /**
     * @When I add Qualaroo custom template tag to container :id
     */
    public function iAddQualarooCustomTemplateTagToContainer($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/tags', $id),
            [
                'name' => $table->getRow(1)[0],
                'template' => 'qualaroo',
                'templateOptions' => [
                    'customerId' => $table->getRow(1)[1],
                    'siteToken' => $table->getRow(1)[2]
                ]
            ]
        );
    }

    /**
     * @When I add Sales Manago custom template tag to container :id
     */
    public function iAddSalesManagoCustomTemplateTagToContainer($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/tags', $id),
            [
                'name' => $table->getRow(1)[0],
                'template' => 'sales_manago',
                'templateOptions' => [
                    'smid' => $table->getRow(1)[1]
                ]
            ]
        );
    }

    /**
     * @When I add Marketo custom template tag to container :id
     */
    public function iAddMarketoCustomTemplateTagToContainer($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/tags', $id),
            [
                'name' => $table->getRow(1)[0],
                'template' => 'marketo',
                'templateOptions' => [
                    'accountId' => $table->getRow(1)[1]
                ]
            ]
        );
    }


    /**
     * @When I add ClickTale custom template tag to container :id
     */
    public function iAddClickTaleCustomTemplateTagToContainer($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/tags', $id),
            [
                'name' => $table->getRow(1)[0],
                'template' => 'click_tale',
                'templateOptions' => [
                    'partition' => $table->getRow(1)[1],
                    'guid' => $table->getRow(1)[2]
                ]
            ]
        );
    }
}
