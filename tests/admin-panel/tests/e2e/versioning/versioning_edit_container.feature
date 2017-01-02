Feature: Any change creates a draft version for edited container
  As a Admin
  I want to save my any changes as a draft version
  So that I can save my changes and publish

  Background:
    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I go to page "#/containers/1/tags"
     Then I should see "Draft" version

      And I press Publish button
     When I follow Edit Tag link
      And I fill tag name field with "edited_tag"
      And I press Save Tag button
     Then I should see "Draft" version

  Scenario: Publish your changes
      And I press Publish button
     Then I should see "Published" version
      And I should see changed tag name

  Scenario: Discard draft changes
     When I press Discard draft changes button
     Then I should see "Published" version

  Scenario: All websites button
    When I press All website button
    Then I should be on page "#/containers/1/debug"



