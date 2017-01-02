@containers
Feature: As a user I want to manage websites in container
  In order to manage website in containers

  Background:
    Given I am logged in as admin

  Scenario: Add website to container
    When I add websites to container "1"
        | url                | parameter_type |
        | http://google.com  | 0              |
        | http://clearcode.cc| 0              |
    Then I expect successful update response
      And I expect valid json response
      And response should contains container with added websites
        | id | url                | parameter_type |
        |  1 | http://google.com  | 0              |
        |  2 | http://clearcode.cc| 0              |
  Scenario: Remove website from container
    When I add websites to container "1"
      | url                 | parameter_type |
      | http://google.com   | 0              |
      | http://clearcode.cc | 0              |
     And I add websites to container "1"
      | url                 | parameter_type |
      | http://clearcode.cc | 0              |
    Then I expect successful update response
      And I expect valid json response
      And response should contains container with added websites
        | id | url                  | parameter_type |
        |  1 | http://clearcode.cc  | 0              |