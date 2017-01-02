@triggers
Feature: As a user I want update trigger

  Background:
    Given I am logged in as admin

  Scenario: Update trigger
    Given I prepare trigger "Dummy name" to container "1" with type "1"
      And I prepare trigger conditions
        | variable                 | condition             | value     |
        | hostname2                | ends_with             | .pl       |
        | event.click              | ends_with             | .pl       |
      And I wait for "1" seconds
    When I update trigger "1"
    Then I expect successful update response
      And I expect valid json response
      And response should contains valid trigger
      And response should contains prepared trigger
      And response row should contains created date
      And response row should contains updated date
      And condition update date should be populated to relations
