Feature: Create new user
  As a Superadmin
  I want to create new user
  So that They can access the various features

  Background:
    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I go to page "#/users"
      And I press Create New User button


  Scenario: Create new user
     When I fill in user email field with "jo@doe.co"
     When I fill in user first name field with "John"
     When I fill in user last name field with "Doe"
      And I press Save user button
     Then I should see notification about create new user

  Scenario: Check validation new user form
     And I fill in user email field with ""
     And I fill in user first name field with ""
     And I fill in user last name field with ""
     And I press Save user button
     And I should not see notification about create new user
