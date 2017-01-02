Feature: Edit synchronous trigger
  As a admin
  I want to edit trigger used to for synchro and asynchro tags
  So that I can edit my triggers but only use page view type
  Scenario: Edit synchronous trigger
  Given I go to homepage
   When I am logged in as a "user1@example.com"
    And I go to page "#/containers/1/trigger/edit/24"
   Then I should see notification about linked trigger to synchronous tags
    And I should see only page view type
