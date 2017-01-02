@users
Feature: As a user I should not be able update user

  Background:
    Given I am logged in as user

  Scenario: Update user
    When I update "1" user with data
      | firstName               |  lastName          | roles            |
      | FirstName123            |  LastName123       | ROLE_SUPER_ADMIN |
    Then I expect forbidden response
