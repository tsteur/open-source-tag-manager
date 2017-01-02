@users
Feature: If user is not logged in should not be able to see users

  Scenario: User list
    When I am on user list resource
    Then I expect unauthorized access response