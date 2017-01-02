@tags
Feature: As a user I want update tag

  Background:
    Given I am logged in as admin

  Scenario: Update tag
    When I update tag "1"
        | name                     | code                       |
        | Updated tag name 1       | Updated tag description 1  |
    Then I expect successful update response
      And I expect valid json response
      And response should contains valid tag
      And response should contains tag
        | name                     | code                       |
        | Updated tag name 1       | Updated tag description 1  |
    And response row should contains created date
    And response row should contains updated date