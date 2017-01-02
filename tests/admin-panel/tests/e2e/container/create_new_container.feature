Feature: Create new container
  As a user, admin
  I want to create new container
  So that I can access the various features


  Scenario Outline: Create new container as a admin role
    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I press Create New Container button
     When I fill in container name field with "<container_name>"
      And I press Save container button
      And I should see notification about create new container
     Then I should be on page "#/containers-explanation/2"


  Examples:
  | container_name  |
  | new_container   |

  Scenario: Create new container as a user role
    Given I go to homepage
     When I am logged in as a "user2@example.com"
     Then I should not see Create new container button

  Scenario Outline: Check validation new container form
    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I press Create New Container button
      And I fill in container name field with "<container_name>"
      And I press Save container button
     Then I should see validation message
      And I should not see notification about create new container
      And I should not see created container on the list


  Examples:
    | container_name   |
    |                  |
