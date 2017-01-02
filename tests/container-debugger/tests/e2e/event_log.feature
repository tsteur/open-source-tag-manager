Feature: Check if event work correctly in debug mode
  As a user
  I want to debug my event
  So that I can access to the event log in debug mode

  Scenario: Check if events show in log list
    Given I go to page "index.test.html#/events-log/list"
     When I should see "e2e container" text in element "#navbar-container-name"
     Then I should see event "stg.pageLoad" on the event log list
      And I should see event "stg.domReady" on the event log list
      And I should see event "stg.pageView" on the event log list
      And I should see event "customEvent" on the event log list
     When I click Be Awesome button
     Then I should see event "stg.click" on the event log list
