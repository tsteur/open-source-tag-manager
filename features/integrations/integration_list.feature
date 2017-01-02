@integrations
Feature: As a admin I want to see integrations

  Background:
    Given I am logged in as admin

  Scenario: Integration list
    When I am on integration list resource
    Then I expect successful list response
    And I expect valid json response
    And response should contains information at least "1" total records
    And response should contains valid integrations list
    And response should contains data rows
      | name                |
      | Integration name 5  |
      | Integration name 6  |
    And response rows should contains created date
    And response rows should contains updated date