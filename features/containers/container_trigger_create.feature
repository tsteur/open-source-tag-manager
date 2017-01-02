@containers
Feature: As a user I want add trigger to container

  Background:
    Given I am logged in as admin

  Scenario: Create trigger container
    Given I prepare trigger "Dummy name" to container "1" with type "1"
      And I prepare trigger conditions
        | variable                | condition             | value     |
        | domain                  | contains              | wykop.p   |
        | hostname                | ends_with             | .pl       |
    When I save trigger
    Then I expect successful create response
      And I expect valid json response
      And response should contains valid trigger
      And response should contains prepared trigger
      And response should contains trigger
        | type                | strategy |
        | 1                   | 1        |
      And response row should contains created date
      And response row should contains updated date

  Scenario: Create trigger container with event type
    Given I prepare trigger "Dummy name" to container "1" with type "3"
    And I prepare empty trigger conditions
    When I save trigger
    Then I expect successful create response
    And I expect valid json response
    And response should contains valid trigger
    And response should contains prepared trigger
    And response should contains trigger
      | type                | strategy |
      | 3                   | 0        |
    And response row should contains created date
    And response row should contains updated date

  Scenario: Create trigger container with invalid type
    Given I prepare trigger "Dummy name" to container "1" with type "10"
    And I prepare trigger conditions
      | variable                | condition             | value     |
      | domain                  | contains              | wykop.p   |
      | hostname                | ends_with             | .pl       |
    When I save trigger
    Then response should contains form errors

  Scenario: Create trigger container with event type and empty conditions
    Given I prepare trigger "Dummy name" to container "1" with type "2"
    And I prepare empty trigger conditions
    When I save trigger
    Then response should contains form errors
