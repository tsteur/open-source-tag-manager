@installer
Feature: Check all validation forms steps in install manager
  As a user
  I want to see validation forms when I make a mistake
  So I should see error message

  Scenario Outline: Validation error database configuration form
    Given I am on "/install.php/configuration/database"
     When I fill hostname field with "<hostname>"
      And I fill database name field with "<database_name>"
      And I fill user name field with "<user_name>"
      And I fill user password field with "<password>"
      And I click Continue button
     Then I should see in database setting form validation "<error>" field
  Examples:
  | hostname   | database_name | user_name | password | error              |
  |            | seventag      | root 	   | 1234     | hostname           |
  | localhost  |               | root 	   | 1234     | database_name      |
  | localhost  | seventag      |           | 1234     | database_username  |
  |            |               |           |          | hostname           |


  Scenario Outline: Validation error create admin user form
    Given I go to "/install.php/admin/create"
     Then I should see "Create admin"
     When I fill email field with "<email>"
      And I fill password field with "<password>"
      And I fill confirm password field with "<confirm_password>"
      And I click Continue button

     Then I should see in create admin form validation "<error>" field

  Examples:
  | email    			| password   | confirm_password | error     |
  | test1@example.com   |        	 |                  | password  |
  |                     |            |                  | email     |
  |                     | testing1 	 | testing1  git add        | email     |
  | test1			    | testing1 	 | testing1         | email     |
  | test1@example.com   |        	 | testing1         | password  |
  | test1@example.com   | testing1 	 |                  | password  |
  | test1@example.com   | testing1 	 | testing2         | password  |

