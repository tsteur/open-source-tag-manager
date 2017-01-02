Feature: Check if show detail of tag in debug mode
  As a user
  I want to see detail of tag
  So that I can access to the tag detail view

  Scenario: I should see detail of tag in debug mode
    Given I go to page "index.test.html#/overview/tags/1"
     When I should see "e2e container" text in element "#navbar-container-name"
     Then I should see html tag content
      And I should see fired tags
      And I should see fired triggers

