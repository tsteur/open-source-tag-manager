Feature: Manage conditions related to trigger
  As a Admin
  I want to manage conditions related to trigger
  So that I can add, edit and delete conditions related to trigger

  Background:
    Given I go to homepage
    When I am logged in as a "user1@example.com"
    When I go to page "#/containers/1/tag/edit/10"

  Scenario: Add new conditions related to trigger
    And I press Create New Trigger button
    And I fill trigger name field with "trigger_example"
    And I choose "page view" trigger type
    And I press Add New Condition button
    And I select "first" option from condition variable for the "first" condition
    And I select "first" option condition for the "first" condition
    And I fill in value condition field with "url_example" for the "first" condition
    And I press add next new condition button
    And I select "second" option from condition variable for the "second" condition
    And I select "second" option condition for the "second" condition
    And I fill in value condition field with "trigger_example2" for the "second" condition
    And I press Add Trigger button related to tag
   Then I should see created trigger on the list
    And I press Save Tag button
    And I should see notification about save tag

  Scenario: Edit conditions related to trigger
    When I edit first trigger related to tag
    When I select "first" option from condition variable for the "first" condition
     And I select "first" option condition for the "first" condition
     And I fill in value condition field with "url_example" for the "first" condition
     And I press Save Trigger button related to tag
    When I edit first trigger related to tag
    Then I should see edited condition on the list

  Scenario: Delete conditions related to trigger
    When I edit first trigger related to tag
     And I press Delete first condition on the list
     And I press Save Trigger button related to tag
    When I edit first trigger related to tag
    Then I should not see deleted condition on the list
