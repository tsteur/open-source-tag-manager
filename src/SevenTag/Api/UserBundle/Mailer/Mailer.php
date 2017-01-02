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

namespace SevenTag\Api\UserBundle\Mailer;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Templating\EngineInterface;
use FOS\UserBundle\Mailer\MailerInterface;
use FOS\UserBundle\Model\UserInterface;

class Mailer implements MailerInterface
{
    /** @var RequestStack */
    private $request;

    /** @var mixed */
    protected $mailer;

    /** @var EngineInterface */
    protected $templating;

    /** @var array */
    protected $parameters;

    /**
     * @param mixed $mailer
     * @param EngineInterface $templating
     * @param array $parameters
     */
    public function __construct(RequestStack $request, $mailer, EngineInterface $templating, array $parameters)
    {
        $this->request = $request;
        $this->mailer = $mailer;
        $this->templating = $templating;
        $this->parameters = $parameters;
    }

    /**
     * @param UserInterface $user
     */
    public function sendConfirmationEmailMessage(UserInterface $user)
    {
        $template = $this->parameters['confirmation.template'];
        $rendered = $this->templating->render($template, [
                'user' => $user,
                'confirmationUrl' => sprintf(
                    '%s://%s/#/reset-password/token/%s',
                    $this->request->getCurrentRequest()->getScheme(),
                    $this->request->getCurrentRequest()->getHost(),
                    $user->getConfirmationToken()
                )
            ]);

        $this->sendEmailMessage($rendered, $this->parameters['from_email']['confirmation'], $user->getEmail());
    }

    /**
     * @param UserInterface $user
     */
    public function sendResettingEmailMessage(UserInterface $user)
    {
        $template = $this->parameters['resetting.template'];
        $rendered = $this->templating->render($template, [
                'user' => $user,
                'confirmationUrl' => sprintf(
                    '%s://%s/#/reset-password/token/%s',
                    $this->request->getCurrentRequest()->getScheme(),
                    $this->request->getCurrentRequest()->getHost(),
                    $user->getConfirmationToken()
                )
            ]);

        $this->sendEmailMessage($rendered, $this->parameters['from_email']['resetting'], $user->getEmail());
    }

    /**
     * @param string $renderedTemplate
     * @param string $fromEmail
     * @param string $toEmail
     */
    protected function sendEmailMessage($renderedTemplate, $fromEmail, $toEmail)
    {
        $renderedLines = explode("\n", trim($renderedTemplate));
        $subject = $renderedLines[0];
        $body = implode("\n", array_slice($renderedLines, 1));

        $message = $this->mailer->createMessage()
            ->setSubject($subject)
            ->setFrom($fromEmail)
            ->setTo($toEmail)
            ->setBody($body);

        $this->mailer->send($message);
    }
}
