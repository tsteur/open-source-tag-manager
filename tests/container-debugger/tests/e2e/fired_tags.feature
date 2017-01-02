Feature: Check if trigger work correctly in debug mode
  As a user
  I want to debug my tags
  So that I can access to the debug mode


  Scenario: Check if fired tags with click trigger work correctly
    Given I go to page "index.test.html#/overview/tags"
     When I should see "e2e container" text in element "#navbar-container-name"
     Then I should see click not fired tag "click"
      And I should see click not fired tag "click class contain simple-btn"
      And I click Be Awesome button
     Then I should see click fired tag "click"
      And I should see click fired tag "click class contain simple-btn"


  Scenario: Check if fired tags with event trigger work correctly
    Given I go to page "index.test.html#/overview/tags"
     When I should see "e2e container" text in element "#navbar-container-name"
     Then I should see event fired tag "event contains customEvent"
      And I should see event not fired tag "event contains customEvent2"
      And I should see not fired tag with enabled DNT
#
  Scenario: Check if fired tags with submit forms trigger work correctly
    Given I go to page "index.test.html#/overview/tags"
     When I should see "e2e container" text in element "#navbar-container-name"
     Then I should see submit forms not fired tag "form classess contains form-class"
      And I click breakpoint button
      And I click login button in form
     Then I should see submit forms fired tag "form classess contains form-class"

  Scenario: Check if fired tags with page view trigger work correctly
    Given I go to page "index.test.html#/overview/tags"
    When I should see "e2e container" text in element "#navbar-container-name"
    Then I should see page view fired tag "page url contains index.html"
    And I should see page view fired tag "page view"
    And I should see page view fired tag "page hostname contains 7tag"
    And I should see page view fired tag "page referrer does not contains referrer"
    And I should see page view fired tag "page path does not contains referrer"
    When I click referrer link
    Then I should see page view not fired tag "page url contains index.html"
    And I should see page view fired tag "page hostname contains 7tag"
    And I should see page view fired tag "page view"
    And I should see page view fired tag "page path does not contains referrer"
    And I should see page view not fired tag "page referrer does not contains referrer"



