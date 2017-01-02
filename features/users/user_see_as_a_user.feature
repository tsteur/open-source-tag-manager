@users
Feature: As a user I should not be able see user

  Background:
    Given I am logged in as user

  Scenario: Get user
    When I get "1" user
    Then I expect forbidden response