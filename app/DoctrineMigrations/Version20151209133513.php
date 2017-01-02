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

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20151209133513 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        if (!$schema->hasTable('container_website')) {
            $this->addSql('CREATE TABLE `container_website` (id INT AUTO_INCREMENT NOT NULL, `container_id` INT NOT NULL, `url` VARCHAR(255) NOT NULL, INDEX IDX_D917D9AABC21F742 (`container_id`), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
            $this->addSql('ALTER TABLE `container_website` ADD CONSTRAINT FK_D917D9AABC21F742 FOREIGN KEY (`container_id`) REFERENCES container (id) ON DELETE CASCADE');
        }

        if ($schema->hasTable('tag') && !$schema->getTable('tag')->hasColumn('isActive')) {
            $this->addSql('ALTER TABLE `tag` ADD `isActive` TINYINT(1) NOT NULL');
            $this->addSql('UPDATE `tag` SET `isActive` = 1');
        }

        if ($schema->hasTable('user') && !$schema->getTable('user')->hasColumn('language')) {
            $this->addSql('ALTER TABLE `user` ADD `language` TINYTEXT DEFAULT NULL');
        }

        $this->addSql('ALTER TABLE `oauth2_access_token` DROP FOREIGN KEY FK_454D967319EB6921');
        $this->addSql('ALTER TABLE `oauth2_access_token` ADD CONSTRAINT FK_454D967319EB6921 FOREIGN KEY (`client_id`) REFERENCES `oauth2_client` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `oauth2_auth_code` DROP FOREIGN KEY FK_1D2905B519EB6921');
        $this->addSql('ALTER TABLE `oauth2_auth_code` ADD CONSTRAINT FK_1D2905B519EB6921 FOREIGN KEY (`client_id`) REFERENCES `oauth2_client` (id) ON DELETE CASCADE');

        if ($schema->hasTable('oauth2_client') && !$schema->getTable('oauth2_client')->hasColumn('user_id')) {
            $this->addSql('ALTER TABLE `oauth2_client` ADD `user_id` INT DEFAULT NULL');
            $this->addSql('ALTER TABLE `oauth2_client` ADD CONSTRAINT FK_669FF9C9A76ED395 FOREIGN KEY (`user_id`) REFERENCES `user` (id) ON DELETE CASCADE');
        }

        if ($schema->hasTable('oauth2_client') && !$schema->getTable('oauth2_client')->hasColumn('created_at')) {
            $this->addSql('ALTER TABLE `oauth2_client` ADD `created_at` DATETIME NOT NULL');
        }

        if ($schema->hasTable('oauth2_client') && !$schema->getTable('oauth2_client')->hasColumn('updated_at')) {
            $this->addSql('ALTER TABLE `oauth2_client` ADD `updated_at` DATETIME NOT NULL');
        }

        if ($schema->hasTable('oauth2_client') && !$schema->getTable('oauth2_client')->hasColumn('type')) {
            $this->addSql('ALTER TABLE `oauth2_client` ADD `type` VARCHAR(255) NOT NULL');
        }

        if ($schema->hasTable('oauth2_client') && !$schema->getTable('oauth2_client')->hasColumn('name')) {
            $this->addSql('ALTER TABLE `oauth2_client` ADD `name` VARCHAR(255) DEFAULT NULL');
        }

        if ($schema->hasTable('oauth2_client') && !$schema->getTable('oauth2_client')->hasIndex('IDX_669FF9C9A76ED395')) {
            $this->addSql('CREATE INDEX IDX_669FF9C9A76ED395 ON `oauth2_client` (`user_id`)');
        }

        $this->addSql('ALTER TABLE `oauth2_refresh_token` DROP FOREIGN KEY FK_4DD9073219EB6921');
        $this->addSql('ALTER TABLE `oauth2_refresh_token` ADD CONSTRAINT FK_4DD9073219EB6921 FOREIGN KEY (`client_id`) REFERENCES `oauth2_client` (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE `container_website`');
        $this->addSql('ALTER TABLE `oauth2_access_token` DROP FOREIGN KEY FK_454D967319EB6921');
        $this->addSql('ALTER TABLE `oauth2_access_token` ADD CONSTRAINT FK_454D967319EB6921 FOREIGN KEY (`client_id`) REFERENCES `oauth2_client` (id)');
        $this->addSql('ALTER TABLE `oauth2_auth_code` DROP FOREIGN KEY FK_1D2905B519EB6921');
        $this->addSql('ALTER TABLE `oauth2_auth_code` ADD CONSTRAINT FK_1D2905B519EB6921 FOREIGN KEY (`client_id`) REFERENCES `oauth2_client` (id)');
        $this->addSql('ALTER TABLE `oauth2_client` DROP FOREIGN KEY FK_669FF9C9A76ED395');
        $this->addSql('DROP INDEX IDX_669FF9C9A76ED395 ON `oauth2_client`');
        $this->addSql('ALTER TABLE `oauth2_client` DROP `user_id`, DROP `created_at`, DROP `updated_at`, DROP `type`, DROP `name`');
        $this->addSql('ALTER TABLE `oauth2_refresh_token` DROP FOREIGN KEY FK_4DD9073219EB6921');
        $this->addSql('ALTER TABLE `oauth2_refresh_token` ADD CONSTRAINT FK_4DD9073219EB6921 FOREIGN KEY (`client_id`) REFERENCES `oauth2_client` (id)');
        $this->addSql('ALTER TABLE `tag` DROP `isActive`');
        $this->addSql('ALTER TABLE `user` DROP `language`');
    }
}
