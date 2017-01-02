@triggers
Feature: As a user I want delete trigger conditions

  Background:
    Given I am logged in as admin

  Scenario: Update trigger
    When I get trigger "1"
    Then I expect valid json response
      And response should contains valid trigger
      And trigger should contains at least "1" conditions
    When I prepare trigger "Dummy name" to container "1" with type "1"
      And I prepare empty trigger conditions
    When I update trigger "1"
    Then I expect successful update response
      And I expect valid json response
      And response should contains valid trigger
      And response should contains prepared trigger
      And trigger should contains exactly "0" conditions
      And response row should contains created date
      And response row should contains updated date
