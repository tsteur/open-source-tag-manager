@users
Feature: As a user I want see my profile

  Background:
    Given I am logged in as admin


  Scenario: View user profile
    When I go to my profile resource
    Then I expect successful response
    When I do logout
    Then I expect successful response
    And I go to my profile resource
    And I expect unauthorized access response