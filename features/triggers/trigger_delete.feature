@triggers
Feature: As a user I want delete trigger

  Background:
    Given I am logged in as admin

  Scenario: Delete trigger
    When I delete trigger "1"
    Then I expect successful delete response
