@tags
Feature: As a user I want see tag

  Background:
    Given I am logged in as admin

  Scenario: Get tag
    When I get tag "1"
    Then I expect successful response
      And I expect valid json response
      And response should contains valid tag
      And response should contains tag
        | id  | name                  | code             | container |
        |  1  | Tag name 0_0          | <div>0_0</div>   | 1         |
      And response row should contains created date
      And response row should contains updated date