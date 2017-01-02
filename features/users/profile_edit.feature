@users
Feature: As a user I want see my profile

  Background:
    Given I am logged in as admin

  Scenario: Edit user profile
    When I update my profile with data
      | firstName               |  lastName          |
      | FirstName123            |  LastName123       |
    Then I expect successful update response
    And I expect valid json response
    And response should contains valid user

  Scenario: Edit user profile without first name
    When I update my profile with data
      | firstName               |  lastName          |
      |                         |  LastName123       |
    Then response should contains form errors

  Scenario: Edit user profile without last name
    When I update my profile with data
      | firstName               |  lastName          |
      | FirstName123            |                    |
    Then response should contains form errors

  Scenario: Edit user profile with roles
    When I update my profile with roles
      | firstName               |  lastName          | roles            |
      | FirstName123            |  LastName123       | ROLE_SUPER_ADMIN |
    Then response should contains form errors