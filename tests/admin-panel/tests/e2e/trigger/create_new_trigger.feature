Feature: I fill in value condition field withFeature: Create new trigger
  As a admin
  I want to create new trigger
  So that I can access to the form create new trigger

  Background:
    Given I go to homepage
     When I am logged in as a "user1@example.com"


  Scenario: Add new trigger related to tag
      And I go to page "#/containers/1/tag/edit/10"
     When I press Create New Trigger button
      And I fill trigger name field with "example_trigger"
      And I choose "page view" trigger type
      And I press Add New Condition button
      And I fill in value condition field with "url_example" for the "first" condition
      And I press Add Trigger button related to tag
     Then I should see created trigger on the list


  Scenario: Add new trigger page view type
    When I go to page "#/containers/1/trigger-create"
     And I fill trigger name field with "example_trigger"
     And I choose "page view" trigger type
     And I press Add New Condition button
     And I fill in value condition field with "url_example" for the "first" condition
     And I press Add Trigger button

  Scenario: Add new trigger event type
    When I go to page "#/containers/1/trigger-create"
     And I fill trigger name field with "example_trigger"
     And I choose "event" trigger type
     And I fill in value condition field with "example_event" for the "first" condition
     And I press add next new condition button
     And I fill in value condition field with "url_example" for the "second" condition
     And I press Add Trigger button
    Then I should see added trigger on the list

  Scenario Outline: Check validation new trigger form
     And I go to page "#/containers/1/trigger-create"
     And I fill trigger name field with "<name_trigger>"
     And I choose "page view" trigger type
     And I press Add New Condition button
     And I fill in value condition field with "<condition_value>" for the "first" condition
     And I press Add Trigger button
    Then I should see notify about error form
     And I should see required validation message "<validation>" field in trigger form



  Examples:
    | name_trigger    | condition_value  | validation        |
    |                 | example_value    | trigger_name      |
    | example_trigger |                  | condition_value   |
    |                 |                  | both              |
