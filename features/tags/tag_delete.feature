@tags
Feature: As a user I want delete tag

  Background:
    Given I am logged in as admin

  Scenario: Delete tag
    When I delete tag "1"
    Then I expect successful delete response