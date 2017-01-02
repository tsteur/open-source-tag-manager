@triggers
Feature: As a user I want get trigger

  Background:
    Given I am logged in as admin

  Scenario: Get trigger
    When I get trigger "1"
    Then I expect successful response
      And I expect valid json response
      And response should contains valid trigger
      And trigger should contains at least "1" total count
      And response row should contains created date
      And response row should contains updated date
