@users
Feature: I should not be able reset password without credentials

  Scenario: Request for resetting password
    When I reset password for user "2"
    Then I expect unauthorized access response