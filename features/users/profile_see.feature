@users
Feature: As a user I want see my profile

  Background:
    Given I am logged in as admin

  Scenario: View user profile
    When I go to my profile resource
    Then I expect successful response
      And I expect valid json response
      And response should contains valid user
      And I should see user data
        | username              |  email             | first_name      | last_name       | status |
        | user1@example.com     |  user1@example.com | FirstName user1 | LastName user1  | true   |
      And I should see user roles
        | role                  |
        | ROLE_SUPER_ADMIN      |