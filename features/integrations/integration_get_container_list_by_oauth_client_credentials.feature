@integrations
Feature: As a user I want get container list by oauth client credentials

  Background:
    Given I am logged in by OAuth client credentials

  Scenario: Get container list
    When I am on container list resource
    Then I expect successful list response
    And I expect valid json response