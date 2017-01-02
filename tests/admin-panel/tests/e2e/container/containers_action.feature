Feature: Edit, Delete containers
  As a user
  I want to delete, edit
  So that I can remove and edit my container on the list

  Background:
    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I press show action container button

  Scenario Outline: Edit container
     When I follow Edit container link
      And I fill in container name field with "<container_name>"
      And I press Save container button
      And I should see notification about edit container
     Then I should be on page "#/containers-edit/1"
     Then I go to page "#/containers"
     Then I should see edited container "<container_name>" on the list

  Examples:
  | container_name |
  | test_container |

  Scenario: Delete container
     When I follow Delete container link
      And I confirm delete container
     Then I should see notification about delete container
     Then I should not see deleted container on the list

  Scenario: Delete container in options
     When I follow Edit container link
      And I press Delete container button
      And I confirm delete container
     Then I should be on page "#/containers"
     Then I should not see deleted container on the list

  Scenario: Delete container on the list
     When I follow Delete container link
      And I confirm delete container
     Then I should see notification about delete container
     Then I should not see deleted container on the list

