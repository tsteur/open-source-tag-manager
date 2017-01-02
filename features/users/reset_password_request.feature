@users
Feature: As a user I want send request for reset password

  Scenario: Reset password token
    When I send request for reset password for user "user1@example.com"
    Then I expect successful response
      And I expect valid json response
      And response should contains successful reset password request message for "user1@example.com"

  Scenario: Reset password token that already exists
    When I send request for reset password for user "user3@example.com"
    Then I expect successful response
    And I expect valid json response
    And response should contains successful reset password request message for "user3@example.com"