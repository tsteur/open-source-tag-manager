@users
Feature: As a admin user I want to update user

  Background:
    Given I am logged in as admin

  Scenario: Update user
    When I update "1" user with data
      | firstName               |  lastName          | roles            |
      | FirstName123            |  LastName123       | ROLE_SUPER_ADMIN |
    Then I expect successful update response
    And I expect valid json response
    And response should contains valid user

  Scenario: Update user with password
    When I update "1" user with password
      | firstName               |  lastName          | roles            | password    | repeat    |
      | FirstName123            |  LastName123       | ROLE_SUPER_ADMIN | asdfasdf    | asdfasdf  |
    Then I expect successful update response
    And I expect valid json response
    And response should contains valid user

  Scenario: Update user with two different passwords
    When I update "1" user with password
      | firstName               |  lastName          | roles            | password    | repeat    |
      | FirstName123            |  LastName123       | ROLE_SUPER_ADMIN | asdfasdf    | asdfaf    |
    Then response should contains form errors

  Scenario: Update user with to short passwords
    When I update "1" user with password
      | firstName               |  lastName          | roles            | password | repeat  |
      | FirstName123            |  LastName123       | ROLE_SUPER_ADMIN | asdf     | asdf    |
    Then response should contains form errors

  Scenario: Update user without firstName
    When I update "1" user with data
      | firstName               |  lastName          | roles            |
      |                         |  LastName123       | ROLE_SUPER_ADMIN |
    Then response should contains form errors

  Scenario: Update user without lastName
    When I update "1" user with data
      | firstName               |  lastName          | roles            |
      | FirstName123            |                    | ROLE_SUPER_ADMIN |
    Then response should contains form errors

  Scenario: Update user without roles
    When I update "1" user with data
      | firstName               |  lastName          | roles |
      | FirstName123            |                    |       |
    Then response should contains form errors
