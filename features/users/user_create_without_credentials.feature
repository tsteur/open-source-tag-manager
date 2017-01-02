@users
Feature: If user is not logged in should not be able to create user

  Scenario: Create user without credentials
    When I create user with data
      | firstName               |  lastName          |  email                    | status | roles            |
      | FirstName123            |  LastName123       |  d.zientalak@clearcode.cc | false  | ROLE_SUPER_ADMIN |
    Then I expect unauthorized access response