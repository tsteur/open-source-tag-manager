@integrations
Feature: As a admin I want create integration

  Background:
    Given I am logged in as admin

  Scenario: Create integration
    When I create integration with data
      | name                  | email                   |
      | Example integration 1 | example@integration.pl  |
    Then I expect successful create response
    And I expect valid json response
    And response should contains valid integration
    And response should contains data
      | name                  |
      | Example integration 1 |
    And response row should contains created date
    And response row should contains updated date

  Scenario: Request for create integration without name
    When I create integration with data
      | name                  | email                   |
      |                       | example@integration.pl  |
    Then response should contains form errors

  Scenario: Request for create integration without email
    When I create integration with data
      | name                  | email                   |
      | Example integration 1 |                         |
    Then response should contains form errors