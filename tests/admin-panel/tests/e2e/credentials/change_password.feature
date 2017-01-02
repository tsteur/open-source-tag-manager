Feature: Change my credentials
  As a user
  I want to change my credentials
  So that I can access change my password

  Scenario: Change my password
    Given I go to homepage
     When I am logged in as a "user1@example.com"
     When I press user menu button
      And I press "#user-menu-my-account" button
      And I choose Change Password tab
      And I fill in my current password field with "testing"
      And I fill in new password with "new_testing"
      And I fill in repeat new password with "new_testing"
      And I press Save Edit Profile button
