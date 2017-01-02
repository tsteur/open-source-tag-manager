@containers
Feature: As a user I want delete container

  Background:
    Given I am logged in as admin

  Scenario: Delete container
    When I delete container "1"
    Then I expect successful delete response