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

namespace SevenTag\Api\TagBundle\Validator\Constraints;

use SevenTag\Api\TagBundle\Template\HolderInterface;
use SevenTag\Component\Tag\Model\TagInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * Class TagTemplateValidator
 * @package SevenTag\Api\TagBundle\Validator\Constraints
 */
class TagTemplateValidator extends ConstraintValidator
{
    /**
     * @var HolderInterface
     */
    private $templateHolder;

    /**
     * @param HolderInterface $templateHolder
     */
    public function __construct(HolderInterface $templateHolder)
    {
        $this->templateHolder = $templateHolder;
    }

    /**
     * @param TagInterface $tag
     * @param Constraint $constraint
     */
    public function validate($tag, Constraint $constraint)
    {
        $template = $tag->getTemplate();
        $templateIsEmpty = empty($template);
        
        if (!$templateIsEmpty && !$this->templateHolder->has($template)) {
            $this->context
                ->buildViolation($constraint->messageCannotFindCustomTemplateByName)
                ->setParameter('%name%', $template)
                ->addViolation();
        }

        if ($templateIsEmpty) {
            $notBlankConstraint = new NotBlank();
            $errorList = $this->context->getValidator()->validate($tag->getCode(), $notBlankConstraint);
            if (count($errorList) !== 0) {
                $this->context
                    ->buildViolation($notBlankConstraint->message)
                    ->atPath('code')
                    ->addViolation();
            }
        }
    }
}
