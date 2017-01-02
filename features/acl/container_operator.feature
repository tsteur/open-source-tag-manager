@acl
Feature: User should be perform operations if have operator permissions

  Scenario: User should be able grant permissions

    Given I am logged in as user
      When I update "1" container permissions
      | user  | permissions  |
      | 5     | operator     |
      And I expect forbidden response

    Given I am logged in as admin
      When I update "1" container permissions
        | user  | permissions  |
        | 4     | operator     |
      Then I expect successful update response

    Given I am logged in as user
      When I update "1" container permissions
        | user  | permissions  |
        | 5     | view         |
      And I expect successful response
      When I get container "1"
      Then I expect successful response
      When I update "1" container with data
        | name                | delay |
        | Updated container 1 | 1001  |
      Then I expect successful update response
      When I delete container "1"
      Then I expect successful delete response