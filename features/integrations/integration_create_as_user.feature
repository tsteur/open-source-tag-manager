@integrations
Feature: As a user I should not be able create integrations

  Background:
    Given I am logged in as user

  Scenario: Create integration
    When I create integration with data
      | name                  | email                   |
      | Example integration 1 | example@integration.pl  |
    Then I expect forbidden response