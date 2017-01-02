@acl
Feature: User should be able view container if have permissions

  Scenario: User should be able view container after granted permissions
    and ACE entry should be updated

    Given I am logged in as user
      When I get container "1"
      And I expect forbidden response

    Given I am logged in as admin
      When I update "1" container permissions
        | user  | permissions |
        | 4     | view        |
      Then I expect successful update response

    Given I am logged in as user
      When I get container "1"
      Then I expect successful response
      When I update "1" container with data
        | name                | description           |
        | Updated container 1 | Updated description 1 |
      Then I expect forbidden response
      When I delete container "1"
      Then I expect forbidden response

    Given I am logged in as admin
      When I update "1" container permissions
        | user  | permissions |
        | 4     | noaccess    |
      Then I expect successful update response

    Given I am logged in as user
      When I get container "1"
      Then I expect forbidden response