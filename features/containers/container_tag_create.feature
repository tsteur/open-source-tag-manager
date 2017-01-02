@containers
Feature: As a user I want add tag to container

  Background:
    Given I am logged in as admin

  Scenario: Create tag container
    When I add tag to container "1"
        | name                | code             |
        | Tag Name Post 1     | <code>123</code> |
    Then I expect successful create response
      And I expect valid json response
      And response should contains valid tag
      And response should contains tag
        | name                | code             |
        | Tag Name Post 1     | <code>123</code> |
      And response row should contains created date
      And response row should contains updated date

  Scenario: Request for create container tag without name
    When I add tag to container "1"
      | name                | code             |
      |                     | <code>123</code> |
    Then response should contains form errors

  Scenario: Request for create container tag without code
    When I add tag to container "1"
      | name                | code             |
      | Name 1              |                  |
    Then response should contains form errors

