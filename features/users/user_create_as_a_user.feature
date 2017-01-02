@users
Feature: As a user I should not be able create users

  Background:
    Given I am logged in as user

  Scenario: Create user
    When I create user with data
      | firstName               |  lastName          |  email                    | roles            |
      | FirstName123            |  LastName123       |  user5@example.com        | ROLE_SUPER_ADMIN |
    Then I expect forbidden response