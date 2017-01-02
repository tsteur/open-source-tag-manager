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

namespace SevenTag\Api\AppBundle\Serializer\Handler;

use JMS\Serializer\Handler\SubscribingHandlerInterface;
use JMS\Serializer\YamlSerializationVisitor;
use JMS\Serializer\JsonSerializationVisitor;
use JMS\Serializer\GraphNavigator;
use JMS\Serializer\GenericSerializationVisitor;
use Symfony\Component\Form\Form;
use Symfony\Component\Form\FormError;
use Symfony\Component\Translation\TranslatorInterface;
use JMS\Serializer\XmlSerializationVisitor;

/**
 * Class ExceptionWrapperHandler
 * @package SevenTag\Api\AppBundle\Serializer\Handler
 */
class FormErrorHandler implements SubscribingHandlerInterface
{
    private $translator;

    public static function getSubscribingMethods()
    {
        $methods = [];
        foreach (['xml', 'json'] as $format) {
            $methods[] = [
                'direction' => GraphNavigator::DIRECTION_SERIALIZATION,
                'type' => 'Symfony\Component\Form\Form',
                'format' => $format,
            ];
            $methods[] = [
                'direction' => GraphNavigator::DIRECTION_SERIALIZATION,
                'type' => 'Symfony\Component\Form\FormError',
                'format' => $format,
            ];
        }

        return $methods;
    }

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    public function serializeFormToXml(XmlSerializationVisitor $visitor, Form $form, array $type)
    {
        if (null === $visitor->document) {
            $visitor->document = $visitor->createDocument(null, null, false);
            $visitor->document->appendChild($formNode = $visitor->document->createElement('form'));
            $visitor->setCurrentNode($formNode);
        } else {
            $visitor->getCurrentNode()->appendChild(
                $formNode = $visitor->document->createElement('form')
            );
        }

        $formNode->setAttribute('name', $form->getName());

        $formNode->appendChild($errorsNode = $visitor->document->createElement('errors'));
        foreach ($form->getErrors() as $error) {
            $errorNode = $visitor->document->createElement('entry');
            $errorNode->appendChild($this->serializeFormErrorToXml($visitor, $error, []));
            $errorsNode->appendChild($errorNode);
        }

        foreach ($form->all() as $child) {
            if ($child instanceof Form) {
                if (null !== $node = $this->serializeFormToXml($visitor, $child, [])) {
                    $formNode->appendChild($node);
                }
            }
        }

        return $formNode;
    }

    public function serializeFormToJson(JsonSerializationVisitor $visitor, Form $form, array $type)
    {
        return $this->convertFormToArray($visitor, $form);
    }

    public function serializeFormToYml(YamlSerializationVisitor $visitor, Form $form, array $type)
    {
        return $this->convertFormToArray($visitor, $form);
    }

    public function serializeFormErrorToXml(XmlSerializationVisitor $visitor, FormError $formError, array $type)
    {
        if (null === $visitor->document) {
            $visitor->document = $visitor->createDocument(null, null, true);
        }

        return $visitor->document->createCDATASection($this->getErrorMessage($formError));
    }

    public function serializeFormErrorToJson(JsonSerializationVisitor $visitor, FormError $formError, array $type)
    {
        return $this->getErrorMessage($formError);
    }

    public function serializeFormErrorToYml(YamlSerializationVisitor $visitor, FormError $formError, array $type)
    {
        return $this->getErrorMessage($formError);
    }

    private function getErrorMessage(FormError $error)
    {
        if (null !== $error->getMessagePluralization()) {
            return $this->translator->transChoice(
                $error->getMessageTemplate(),
                $error->getMessagePluralization(),
                $error->getMessageParameters(),
                'messages'
            );
        }

        return $this->translator->trans($error->getMessageTemplate(), $error->getMessageParameters(), 'messages');
    }

    private function convertFormToArray(GenericSerializationVisitor $visitor, Form $data)
    {
        $isRoot = null === $visitor->getRoot();
        $isFormRoot = $data->getParent() === null;

        $form = $errors = [];
        foreach ($data->getErrors() as $error) {
            $errors[] = $this->getErrorMessage($error);
        }

        if ($errors) {
            if ($isFormRoot) {
                $form['form'] = $errors;
            } else {
                $form = $errors;
            }
        }

        $children = [];
        foreach ($data->all() as $child) {
            if ($child instanceof Form) {
                $children[$child->getName()] = $this->convertFormToArray($visitor, $child);
            }
        }

        if ($children) {
            $form['fields'] = $children;
        }

        if ($isRoot) {
            $visitor->setRoot($form);
        }

        return $form;
    }
}
