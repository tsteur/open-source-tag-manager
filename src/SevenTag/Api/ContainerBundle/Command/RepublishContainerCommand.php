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

namespace SevenTag\Api\ContainerBundle\Command;

use SevenTag\Api\ContainerBundle\Service\RepublishContainer;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\DialogHelper;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class RepublishContainerCommand extends Command
{
    /**
     * @var RepublishContainer
     */
    private $republish;

    /**
     * @param RepublishContainer $republish
     */
    public function __construct(RepublishContainer $republish)
    {
        $this->republish = $republish;

        parent::__construct(null);
    }

    protected function configure()
    {
        $this
            ->setName('seventag:republish')
            ->setDescription('Republish containers or specified container')
            ->addOption('containerId', 'c', InputOption::VALUE_OPTIONAL, 'If set, republished will be only this container.', null);
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|null|void
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $containers = $this->republish->getContainersToProcess($input->getOption('containerId'));

        if ($containers->isEmpty()) {
            $output->writeln('<comment>Nothing to republish.</comment>');

            return;
        }

        /** @var DialogHelper $dialog */
        $dialog = $this->getHelper('dialog');
        if (!$dialog->askConfirmation($output, sprintf('<question>%d containers will be republished. Are you sure?', $containers->count(), false))) {
            return;
        }

        $progress = new ProgressBar($output, $containers->count());

        foreach ($containers as $container) {
            $this->republish->process($container);

            $progress->advance();
        }

        $progress->finish();

        $output->writeln('');
        $output->writeln('<info>Republish completed.</info>');
    }
}
