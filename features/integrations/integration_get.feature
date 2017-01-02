@integrations
Feature: As a admin I want get integration

  Background:
    Given I am logged in as admin

  Scenario: Get integration
    When I get integration "2"
    Then I expect successful response
    And I expect valid json response
    And response should contains valid integration
    And response should contains data
      | name                  |
      | Integration name 0    |
    And response row should contains created date
    And response row should contains updated date
