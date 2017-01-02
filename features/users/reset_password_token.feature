@users
Feature: As a user I want reset password

  Scenario: Reset password
    When I reset password using token "571e8237a508452478fde0456bffa83622225568"
      | first               |  second          |
      | newpassword123      |  newpassword123  |
    Then I expect successful response
      And I expect valid json response
      And response should contains successful reset password message