@users
Feature: As a user I should get information about unauthorized access

  Scenario: Check unauthorized access
    When I go to my profile resource
    Then I expect unauthorized access response