Feature: Edit, Delete users
  As a admin
  I want to delete, edit action
  So that I can remove and edit my users on the list

  Background:
    Given I go to homepage
     When I am logged in as a "user1@example.com"

  Scenario: Edit user
      And I go to page "#/users"
      And I press Show Users Actions button
      And I press Edit User button
      And I fill in user first name field with "Tom"
      And I fill in user last name field with "Jerry"
      And I press Save user button
      And I go to page "#/users"
     Then I should see edited user "Tom Jerry" on the list


  Scenario: Delete user
      And I go to page "#/users"
      And I should see user "user2@example.com" on the list
      And I press Show Users Actions button
      And I press Delete User button
      And I confirm delete user
      And I go to page "#/users"
     Then I should see empty list
