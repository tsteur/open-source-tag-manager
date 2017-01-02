Feature: Edit, Delete triggers
  As a admin
  I want to delete, edit action
  So that I can remove and edit my triggers on the list

  Background:
    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I go to page "#/containers/1/triggers"
      And I press trigger action menu

  Scenario: Edit trigger
      And I press Edit Trigger button
      And I fill trigger name field with "example_trigger"
      And I press Save Trigger button
     Then I should see notification about save tag
      And I should see edited trigger on the list


  Scenario: Delete trigger
     And I press Delete Trigger button
     And I confirm delete trigger
     And I should see notification about delete tag
    Then I should not see deleted trigger on the list

  Scenario: Delete trigger related to tag
     And I go to page "#/containers/1/tag/edit/1"
     And I press Delete Trigger related to tag
    Then I should not see deleted trigger related to tag
