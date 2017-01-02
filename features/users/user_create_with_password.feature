@users
Feature: As a admin user I want to create user

  Background:
    Given I am logged in as admin

  Scenario: Create user with password
    When I create user with password
    | firstName               |  lastName          |  email                    | roles            | password    | repeat    |
    | FirstName123            |  LastName123       |  m.nitschke@example.com   | ROLE_SUPER_ADMIN | asdfasdf    | asdfasdf  |
    Then I expect successful response
    And I expect valid json response
    And response should contains valid user
    And I should see user data
      | username                 |  email                  | first_name      | last_name       | status |
      | m.nitschke@example.com   |  m.nitschke@example.com | FirstName123    | LastName123     | true   |


  Scenario: Create user with two different passwords
    When I create user with password
    | firstName               |  lastName          |  email                    | roles            | password    | repeat   |
    | FirstName123            |  LastName123       |  m.nitschke@example.com   | ROLE_SUPER_ADMIN | asdfasdf    | asdfasf  |
    Then response should contains form errors

  Scenario: Create user with two short passwords
    When I create user with password
    | firstName               |  lastName          |  email                    | roles            | password    | repeat   |
    | FirstName123            |  LastName123       |  m.nitschke@example.com   | ROLE_SUPER_ADMIN | asdf        | asdf     |
    Then response should contains form errors