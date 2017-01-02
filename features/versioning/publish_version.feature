@versioning
Feature: Publish version

  Background:
    Given I am logged in as admin

  Scenario: Container publishing works after making changes
    When I change container "1" name to "Test name after publishing"
    Then I publish container "1"
     And container "1" is published
     And container "1" name should be "Test name after publishing"

  Scenario: Publish already published version
    When I publish container "1"
    Then container "1" is published
     And container "1" version id is "44"
    When I publish container "1"
    Then container "1" is published
     And container "1" version id is "45"