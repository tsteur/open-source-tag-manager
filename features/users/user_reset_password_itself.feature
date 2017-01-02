@users
Feature: As a admin I should not be able reset password itself

  Background:
    Given I am logged in as admin

  Scenario: Request for resetting password
    When I reset password for user "1"
    Then I expect forbidden response