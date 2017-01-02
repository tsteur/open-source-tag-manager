@users
Feature: As a user I want to see users

  Background:
    Given I am logged in as admin

  Scenario: User list
    When I am on user list resource
    Then I expect successful list response
      And I expect valid json response
      And response should contains valid users list
      And response should contains information at least "1" total records
      And response should contains data rows
        | username             |  email            | first_name      | last_name       | status |
        | user3@example.com    | user3@example.com | FirstName user3 | LastName user3  | true   |
        | user2@example.com    | user2@example.com | FirstName user2 | LastName user2  | true   |