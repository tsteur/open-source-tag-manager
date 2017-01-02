
Feature: Edit, Delete tags
  As a admin
  I want to delete, edit action
  So that I can remove and edit my tags on the list

  Background:
    Given I go to homepage
     When I am logged in as a "user1@example.com"

  Scenario: Edit tag
      And I go to page "#/containers/1/tags"
      And I press Show Actions button
      And I press Edit Tag button
      And I fill tag name field with "edited_tag"
      And I fill html code with "example_code"
      And I press Save Tag button
     Then I should see notification about edit tag
     Then I should see edited tag "edited_tag" on the list

      
  Scenario: Delete tag
      And I go to page "#/containers/1/tags"
      And I should see trigger "Tag name 12: HTML" on the list
      And I press Show Actions button
      And I press Delete Tag button
      And I confirm delete tag
     Then I should see notification about delete tag
      And I should not see deleted tag "Tag name 12: HTML" on the list

