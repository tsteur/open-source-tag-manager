@containers
Feature: As a user I want create container

  Background:
    Given I am logged in as admin

  Scenario: Create container
    When I create container with data
        | name                |
        | Example container 1 |
    Then I expect successful create response
      And I expect valid json response
      And response should contains valid container
      And response should contains data
        | name                |
        | Example container 1 |
      And response row should contains created date
      And response row should contains updated date

  Scenario: Request for create container without name
    When I create container with data
        | name                | delay |
        |                     | 1000  |
    Then response should contains form errors