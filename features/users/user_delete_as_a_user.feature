@users
Feature: As a user I should not be able delete user

  Background:
    Given I am logged in as user

  Scenario: Delete user
    When I delete user "2"
    Then I expect forbidden response
    When I get "2" user
    Then I expect forbidden response