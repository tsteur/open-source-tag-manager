@containers
Feature: As a user I want see container

  Background:
    Given I am logged in as admin

  Scenario: Get container
    When I get container "1"
    Then I expect successful response
      And I expect valid json response
      And response should contains valid container object
      And response should contains data
        | name                |
        | Container name 0    |
      And response row should contains created date
      And response row should contains updated date