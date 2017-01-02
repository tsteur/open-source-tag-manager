@acl
Feature: User should be able to see users permissions for given container

  Scenario: Get users permissions list for given container
    Given I am logged in as admin
    When I get "1" container permissions
    Then I expect successful response