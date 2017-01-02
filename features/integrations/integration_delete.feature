@integrations
Feature: As a admin I want delete integration

  Background:
    Given I am logged in as admin

  Scenario: Delete integration
    When I delete integration "3"
    Then I expect successful delete response