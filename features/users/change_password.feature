@users
Feature: As a user I want change password

  Background:
    Given I am logged in as admin

  Scenario: Change password
    When I change my current password "testing"
      | first               |  second          |
      | newpassword123      |  newpassword123  |
    Then I expect successful response
      And I expect valid json response
      And response should contains successful change password message