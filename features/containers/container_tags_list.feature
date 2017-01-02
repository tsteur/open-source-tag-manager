@containers
Feature: As a user I want see container tags

  Background:
    Given I am logged in as admin

  Scenario: Get container tags
    When I get tags related to container "1"
    Then I expect successful list response
      And I expect valid json response
      And response should contains information at least "1" total records
      And response should contains valid tags list
      And response should contains tags
        | name                | code                    | container |
        | Tag name 0_10       | <div>0_10</div>         | 1         |
      And response rows should contains created date
      And response rows should contains updated date