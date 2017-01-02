@users
Feature: As a admin I should not be able delete itself

  Background:
    Given I am logged in as admin

  Scenario: Delete user
    When I delete user "1"
    Then I expect forbidden response
    When I get "1" user
    Then I expect successful response
    And I expect valid json response
    And response should contains valid user
    And I should see user data
      | username          |  email             | first_name      | last_name       | status |
      | user1@example.com |  user1@example.com | FirstName user1 | LastName user1  | true   |
    And I should see user roles
      | role                  |
      | ROLE_SUPER_ADMIN      |