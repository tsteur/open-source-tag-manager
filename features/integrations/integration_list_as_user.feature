@integrations
Feature: As a user I should not be able list integrations

  Background:
    Given I am logged in as user

  Scenario: Integration list
    When I am on integration list resource
    Then I expect forbidden response