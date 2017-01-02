@containers
Feature: As a user I want to see containers

  Background:
    Given I am logged in as admin

  Scenario: Container list
    When I am on container list resource
    Then I expect successful list response
      And I expect valid json response
      And response should contains information at least "1" total records
      And response should contains valid containers list
    And response rows should contains created date
    And response rows should contains updated date

  Scenario: Container list filtered by name with positive results
    When I filter container list by name "con"
    Then I expect successful list response
    And I expect valid json response
    And response should contains information at least "1" total records
    And response should contains valid containers list
    And response rows should contains created date
    And response rows should contains updated date

  Scenario: Container list filtered by name with negative results
    When I filter container list by name "loremipsum"
    Then I expect successful list response
    And I expect valid json response
    And response should contains information at least "0" total records