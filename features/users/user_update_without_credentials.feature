@users
Feature: If user is not logged in should not be able to update user

  Scenario: Update user without credentials
    When I update "1" user with data
      | firstName               |  lastName          | roles            |
      | FirstName123            |  LastName123       | ROLE_SUPER_ADMIN |
    Then I expect unauthorized access response