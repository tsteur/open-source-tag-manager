Feature: Check if assistance hints appear on the service.
  As a user
  I want to see assistance hints about service component
  So that I can should see this hints

  Scenario: Container list helper
    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I should be on page "#/containers"
     Then I should see helper about "container_header"
      And I should see helper about "container_id"

  Scenario: Tags list helper
    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I go to page "#/containers/1/tags"
     Then I should see helper about "triggers"
      And I should see helper about "tags_header"
      And I should see helper about "tag_type"

  Scenario: Tags form helper
    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I go to page "#/containers/1/tag/edit/13"
     Then I should see helper about "tag_html"
      And I should see helper about "fires_on"
     When I press Create New Trigger button
     Then I should see helper about "loads_on"
      And I should see helper about "conditions"

  Scenario: Triggers list helper
    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I go to page "#/containers/1/triggers"
     Then I should see helper about "triggers_header"
      And I should see helper about "tags"
      And I should see helper about "type"

  Scenario: Container option helper
    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I go to page "#/containers-edit/1"
     Then I should see helper about "container_code"
