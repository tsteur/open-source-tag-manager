@containers
Feature: As a user I want update container
  In order to manage containers

  Background:
    Given I am logged in as admin

  Scenario: Update container
    When I update "1" container with data
        | name                |
        | Updated container 1 |
    Then I expect successful update response
      And I expect valid json response
      And response should contains data
        | name                |
        | Updated container 1 |
    And response row should contains created date
    And response row should contains updated date

  Scenario: Request for update container without name
    When I update "1" container with data
        | name                |
        |                     |
    Then response should contains form errors