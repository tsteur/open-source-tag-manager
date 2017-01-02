@skip
Feature: Create new tag
  As a admin
  I want to create new tag
  So that I can access to the form create new tags

  Background:
    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I go to page "#/containers/1/tags"
      And I press Add New Tag button

  Scenario Outline: Add new tag
    When I fill tag name field with "<tag_name>"
     And I click on Custom Html Tag
     And I fill html code with "example_code"
     And I press Save Tag button
    Then I should see notification about create new tag
    Then I should see created tag "<tag_name>" on the list


  Examples:
  | tag_name    |
  | example_tag |

  Scenario Outline: Check validation new tag form
     When I fill tag name field with "<tag_name>"
      And I click on Custom Html Tag
      And I fill html code with "<code>"
      And I press Save Tag button
     Then I should see notification about error form
     Then I should see required validation message "<validation>" field in tag form


    Examples:
    | tag_name    | code           | validation |
    |             | example code   | tag_name   |
    | example tag |                | html_code  |
    |             |                | both       |

  Scenario: Add existing triggers to tag
    When I fill tag name field with "example_tag"
     And I click on Custom Html Tag
     And I fill html code with "example _code"
    When I press Add Existing trigger button
     And I check first existing trigger
     And I press Add button
    Then I should see added trigger inside the tag
    When I press Add Existing trigger button I should not see already choosen triggers on list
     And I press Cancel button
     And I press Save Tag button
    Then I should see notification about create new tag
    Then I should see created tag "example_tag" on the list

