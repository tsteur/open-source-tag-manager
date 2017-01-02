@acl
Feature: User should be able grant permissions
  If some conditions are fulfilled

  Scenario: Admin should be able grant permissions to simple user
    Given I am logged in as admin
    When I update "1" container permissions
      | user  | permissions |
      | 4     | operator    |
    Then I expect successful update response