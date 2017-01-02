@users
Feature: As a admin user I want to create user

  Background:
    Given I am logged in as admin

  Scenario: Create user
    When I create user with data
      | firstName               |  lastName          |  email                    | roles            |
      | FirstName123            |  LastName123       |  user52@example.com       | ROLE_SUPER_ADMIN |
    Then I expect successful response
    And I expect valid json response
    And response should contains valid user
    And I should see user data
      | username                |  email              | first_name      | last_name       | status |
      | user52@example.com      |  user52@example.com | FirstName123    | LastName123     | false  |
    And I should see user roles
      | role                  |
      | ROLE_SUPER_ADMIN      |

  Scenario: Create user without firstName
    When I create user with data
      | firstName               |  lastName          |  email                    | roles            |
      |                         |  LastName123       |  d.zientalak@clearcode.cc | ROLE_SUPER_ADMIN |
    Then response should contains form errors

  Scenario: Create user without lastName
    When I create user with data
      | firstName               |  lastName          |  email                    | roles            |
      | FirstName123            |                    |  d.zientalak@clearcode.cc | ROLE_SUPER_ADMIN |
    Then response should contains form errors

  Scenario: Create user without email
    When I create user with data
      | firstName               |  lastName          |  email                    | roles            |
      | FirstName123            |  LastName123       |                           | ROLE_SUPER_ADMIN |
    Then response should contains form errors

  Scenario: Create user without roles
    When I create user with data
      | firstName               |  lastName          |  email                    | roles            |
      | FirstName123            |  LastName123       |  d.zientalak@clearcode.cc |                  |
    Then response should contains form errors

  Scenario: Create user with invalid role
    When I create user with data
      | firstName               |  lastName          |  email                    | roles            |
      | FirstName123            |  LastName123       |  d.zientalak@clearcode.cc | ROLE_MODERATOR   |
    Then response should contains form errors

  Scenario: Create user with email that exists
    When I create user with data
      | firstName               |  lastName          |  email             | roles            |
      | FirstName123            |  LastName123       |  user1@example.com | ROLE_SUPER_ADMIN |
    Then response should contains form errors
