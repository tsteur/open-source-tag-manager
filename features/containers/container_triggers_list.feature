@containers
Feature: As a user I want see container triggers

  Background:
    Given I am logged in as admin

  Scenario: Get container triggers
    When I get triggers related to container "1"
    Then I expect successful list response
    And I expect valid json response
    And response should contains information at least "1" total records
    And response should contains valid triggers list
    And response should contains triggers
      | id    | name          | container | type | strategy |
      | 23    | Trigger 0_22  | 1         | 0    | 1        |
      | 22    | Trigger 0_21  | 1         | 0    | 1        |
      | 21    | Trigger 0_20  | 1         | 0    | 1        |
      | 20    | Trigger 0_19  | 1         | 0    | 1        |
      | 19    | Trigger 0_18  | 1         | 0    | 1        |
      | 18    | Trigger 0_17  | 1         | 0    | 1        |
      | 17    | Trigger 0_16  | 1         | 0    | 1        |
    And response rows should contains created date
    And response rows should contains updated date