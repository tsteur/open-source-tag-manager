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

namespace SevenTag\Plugin\PiwikCustomTemplateBundle\Template;

use SevenTag\Api\TagBundle\Template\TemplatingProvider;
use SevenTag\Component\Tag\Model\TagInterface;

/**
 * Class PiwikProvider
 * @package SevenTag\Plugin\PiwikCustomTemplateBundle\Template
 */
class PiwikProvider extends TemplatingProvider
{
    const KEY = 'piwik';

    /**
     * {@inheritdoc}
     */
    public function getKey()
    {
        return self::KEY;
    }

    /**
     * {@inheritdoc}
     */
    public function getFormType()
    {
        return 'piwik_template_form_type';
    }

    /**
     * {@inheritdoc}
     */
    public function prePersist(TagInterface $tag)
    {
        $tag->setCode($this->generateCode($tag));
        $tag->setDocumentWrite(false);

        return $tag;
    }

    /**
     * {@inheritdoc}
     */
    public function getTemplatePath()
    {
        return 'SevenTagPluginPiwikCustomTemplateBundle:Template:PiwikProvider.js.twig';
    }

    /**
     * {@inheritdoc}
     */
    protected function getTemplateOptions(TagInterface $tag)
    {
        $templateOptions = $tag->getTemplateOptions();
        $templateOptions = $this->prepareEvents($templateOptions);


        return $templateOptions;
    }

    /**
     * @param array $templateOptions
     * @return array
     */
    protected function prepareEvents($templateOptions)
    {
        if (isset($templateOptions['events'])) {
            foreach ($templateOptions['events'] as $eventKey => $event) {
                $values = '';
                foreach ($event['values'] as $valueKey => $value) {
                    $values .= sprintf(',%s', $value['value']);
                }
                $templateOptions['events'][$eventKey]['values'] = $values;
            }

            return $templateOptions;
        }

        return $templateOptions;
    }
}
