@acl
Feature: User should not be able grant permissions
  If some conditions are fulfilled

  Scenario: Grant permissions to admin is not allowed
    Given I am logged in as admin
    When I update "1" container permissions
      | user  | permissions |
      | 2     | operator    |
    Then response should contains form errors

  Scenario: User should not be able grant permissions itself

    Given I am logged in as admin
    When I update "1" container permissions
      | user  | permissions |
      | 4     | operator    |
    And I expect successful update response

    Given I am logged in as user
    When I update "1" container permissions
      | user  | permissions |
      | 4     | operator    |
    Then response should contains form errors