Feature: Check if variables work correctly in debug mode
  As a user
  I want to debug my variables
  So that I can access to the variables in debug mode

  Scenario: Check if variables show in log list
    Given I go to page "index.test.html#/overview/tags"
     When I click Event Log tab
      And I should see "e2e container" text in element "#navbar-container-name"
     Then I should see event "stg.click" on the event log list
     When I click first state on the event log list
      And I click variables tab
     Then I should see variable "urlVariable" on the event log list
      And I should see variable "pageUrl" on the event log list
      And I should see variable "pageHostname" on the event log list
      And I should see variable "pagePath" on the event log list
      And I should see variable "campaign" on the event log list
      And I should see variable "clickClasses" on the event log list
    And I should see variable "event" on the event log list
    And I should see variable "referrer" on the event log list
    And I should see variable "constant" on the event log list
    And I should see variable "cookie" on the event log list
    And I should see variable "dataLayer" on the event log list
    And I should see variable "document" on the event log list
