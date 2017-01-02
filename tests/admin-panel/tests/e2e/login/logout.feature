Feature: Logout
  As a user
  I want to be logout from the site
  So that I can access to logout

  Scenario: Logout
    Given I go to homepage
     When I am logged in as a "user1@example.com"
     Then I should be on page "#/containers"
     When I press user menu button
     And  I press Logout button
     Then I should be on page "#/sign-in"


