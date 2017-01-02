@acl
Feature: User should be able delete container if have permissions

  Scenario: User should be able delete container after granted permissions
    and ACE entry should be updated

    Given I am logged in as user
      When I delete container "1"
      Then I expect forbidden response

    Given I am logged in as admin
      When I update "1" container permissions
        | user  | permissions  |
        | 4     | operator     |
      Then I expect successful update response

    Given I am logged in as user
      When I delete container "1"
      Then I expect successful delete response