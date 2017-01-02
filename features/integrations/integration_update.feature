@integrations
Feature: As a admin I want update integration

  Background:
    Given I am logged in as admin

  Scenario: Update integration
    When I update integration "2"
      | name                      |
      | Updated integration name  |
    Then I expect successful update response
    And I expect valid json response
    And response should contains valid integration
    And response should contains data
      | name                      |
      | Updated integration name  |
    And response row should contains created date
    And response row should contains updated date