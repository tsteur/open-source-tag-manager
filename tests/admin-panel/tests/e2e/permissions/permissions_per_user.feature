Feature: Users permissions
  As a user
  I want to have access only for part of application which my superadmin assign for me

  Background: Login as admin
    Given I go to homepage
     When I am logged in as a "user1@example.com"
     Then I should be on page "#/containers"
     When I go to page "#/containers-edit/1"
      And I click permissions tab

  Scenario: Login as user with view containers permissions
      And I set view permission for user
     When I press user menu button
     And  I press Logout button
      And I am logged in as a "user2@example.com"
     Then I should be on page "#/containers"
      And I should see permission view
     When I go to page "#/containers/1/tags"
     Then I should not see Publish button
     When I go to page "#/containers/1/tag/edit/13"
     Then I should not change tag name
      And I should not see Save button
      And I should not enabled document write
     When I click Advanced settings
     Then I should not enabled DNT in debug mode
      And I should not enabled Respect visitor privacy
     When I click edit Trigger
      And I should not change trigger name
      And I should not change trigger type
      And I should not change conditions
     When I go to page "#/containers-edit/1"
      And I should not change container name
#      And I should not change delay setting
    Then I should not see permissions tab



  Scenario: Login as user with edit containers permissions
      And I set edit permission for user
     When I press user menu button
     And  I press Logout button
      And I am logged in as a "user2@example.com"
     Then I should be on page "#/containers"
      And I should see permission edit
     When I go to page "#/containers/1/tags"
      And I go to page "#/containers/1/tag/edit/13"
      And I fill tag name field with "test"
      And I click Advanced settings
      And I check Respect visitor privacy
      And I check document write
      And I check DNT in debug mode
      And I click edit Trigger
      And I fill trigger name field with "test_trigger"
      And I select "first" option from condition variable for the "first" condition
      And I select "first" option condition for the "first" condition
      And I fill in value condition field with "url_example" for the "first" condition
      And I press Save Trigger button related to tag
     Then I should see created trigger on the list
     When I press Save Tag button
     Then I should see notification about create new tag
     Then I should see created tag "test" on the list
    When I go to page "#/containers-edit/1"
    Then I should not see permissions tab

  Scenario: Login as user with publish containers permissions
     And I set publish permission for user
    When I press user menu button
    And  I press Logout button
     And I am logged in as a "user2@example.com"
    Then I should be on page "#/containers"
     And I should see permission publish
    When I go to page "#/containers/1/tags"
    Then I should see Publish button
    When I go to page "#/containers/1/tag/edit/13"
     And I fill tag name field with "test"
     And I click Advanced settings
     And I check Respect visitor privacy
     And I check document write
     And I check DNT in debug mode
     And I click edit Trigger
     And I fill trigger name field with "test_trigger"
     And I select "first" option from condition variable for the "first" condition
     And I select "first" option condition for the "first" condition
     And I fill in value condition field with "url_example" for the "first" condition
     And I press Save Trigger button related to tag
    Then I should see created trigger on the list
    When I press Save Tag button
    Then I should see notification about create new tag
    Then I should see created tag "test" on the list
    When I go to page "#/containers-edit/1"
     And I change container name
#     And I change delay setting
    Then I should not see permissions tab
     And I press Save container button
     And I go to page "#/containers"
    Then I should see edited container "test2" on the list
    When I go to page "#/containers-edit/1"


  Scenario: Login as user with owner containers permissions
    And I set owner permission for user
    When I press user menu button
    And  I press Logout button
    And I am logged in as a "user2@example.com"
    Then I should be on page "#/containers"
    And I should see permission owner
    When I go to page "#/containers/1/tags"
    Then I should see Publish button
    When I go to page "#/containers/1/tag/edit/13"
    And I fill tag name field with "test"
    And I click Advanced settings
    And I check Respect visitor privacy
    And I check document write
    And I check DNT in debug mode
    And I click edit Trigger
    And I fill trigger name field with "test_trigger"
    And I select "first" option from condition variable for the "first" condition
    And I select "first" option condition for the "first" condition
    And I fill in value condition field with "url_example" for the "first" condition
    And I press Save Trigger button related to tag
    Then I should see created trigger on the list
    When I press Save Tag button
    Then I should see notification about create new tag
    Then I should see created tag "test" on the list
    When I go to page "#/containers-edit/1"
    And I change container name
#     And I change delay setting
    Then I should see permissions tab
    And I press Save container button
    And I go to page "#/containers"
    Then I should see edited container "test2" on the list
