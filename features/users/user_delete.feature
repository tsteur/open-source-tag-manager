@users
Feature: As a admin I want delete user

  Background:
    Given I am logged in as admin

  Scenario: Delete user
    When I delete user "2"
    Then I expect successful delete response
    When I get "2" user
    Then I expect not found response