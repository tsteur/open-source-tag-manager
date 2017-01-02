Feature: Any change creates a draft version for new create container
  As a Admin
  I want to save my any changes as a draft version
  So that I can save my changes and publish

    Scenario: New container should be draft
      Given I go to homepage
       When I am logged in as a "user1@example.com"
        And I press Create New Container button
        And I fill in container name field with "example_container"
        And I press Save container button
       Then I should see "Draft" version
