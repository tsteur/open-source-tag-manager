@versioning
Feature: Restore version

  Background:
    Given I am logged in as admin

  Scenario: Restore version in unpublished container should occur problem
    When I restore container "1"
    Then I expect status code "404"

  Scenario: Restore container published without any changes does nothing
    When I change container "1" name to "Test container"
    And I change tags to
      | 1 | test tag 1 | <b>test code 1</b> |
      | 2 | test tag 2 | <b>test code 2</b> |
      | 3 | test tag 3 | <b>test code 3</b> |
    And I change triggers to
      | 1 | test trigger 1 | 1 | 3 |
      | 2 | test trigger 2 | 2 | 1 |
      | 3 | test trigger 3 | 3 | 3 |
    When I change trigger "1" conditions to
      | test variable 1 | test condition 1 | test value 1 |
      | test variable 2 | test condition 2 | test value 2 |
      | test variable 3 | test condition 3 | test value 3 |
    Then I publish container "1"
     And I restore container "1"
    Then container "1" name should be "Test container"
     And triggers should look like
      | 1 | test trigger 1 | 1 |
      | 2 | test trigger 2 | 2 |
      | 3 | test trigger 3 | 3 |
    And tags should look like
      | 1 | test tag 1 | <b>test code 1</b> |
      | 2 | test tag 2 | <b>test code 2</b> |
      | 3 | test tag 3 | <b>test code 3</b> |
    And trigger "1" conditions should look like
      | test variable 1 | test condition 1 | test value 1 |
      | test variable 2 | test condition 2 | test value 2 |
      | test variable 3 | test condition 3 | test value 3 |

  Scenario: Restore container after changing tags
    When I change container "1" name to "Test container"
    And I change tags to
      | 1 | test tag 1 | <b>test code 1</b> |
      | 2 | test tag 2 | <b>test code 2</b> |
      | 3 | test tag 3 | <b>test code 3</b> |
    Then tags should look like
      | 1 | test tag 1 | <b>test code 1</b> |
      | 2 | test tag 2 | <b>test code 2</b> |
      | 3 | test tag 3 | <b>test code 3</b> |
    When I publish container "1"
     And I change container "1" name to "Updated container"
    Then container "1" name should be "Updated container"
     And I change tags to
      | 1 | updated tag 1 | <b>updated code 1</b> |
      | 2 | updated tag 2 | <b>updated code 2</b> |
      | 3 | updated tag 3 | <b>updated code 3</b> |
    Then tags should look like
      | 1 | updated tag 1 | <b>updated code 1</b> |
      | 2 | updated tag 2 | <b>updated code 2</b> |
      | 3 | updated tag 3 | <b>updated code 3</b> |
    When I restore container "1"
    Then tags should look like
      | 1 | test tag 1 | <b>test code 1</b> |
      | 2 | test tag 2 | <b>test code 2</b> |
      | 3 | test tag 3 | <b>test code 3</b> |
     And container "1" name should be "Test container"

  Scenario: Restore container after changing triggers
    When I change triggers to
      | 1 | test trigger 1 | 1 |
      | 2 | test trigger 2 | 2 |
      | 3 | test trigger 3 | 3 |
    Then I publish container "1"
     And I change triggers to
      | 1 | updated trigger 1 | 1 | 3 |
      | 2 | updated trigger 2 | 2 | 3 |
      | 3 | updated trigger 3 | 3 | 3 |
    Then triggers should look like
      | 1 | updated trigger 1 | 1 |
      | 2 | updated trigger 2 | 2 |
      | 3 | updated trigger 3 | 3 |
    When I restore container "1"
    Then triggers should look like
      | 1 | test trigger 1 | 1 |
      | 2 | test trigger 2 | 2 |
      | 3 | test trigger 3 | 3 |

  Scenario: Restore container after changing conditions
    When I change trigger "1" conditions to
      | test variable 1 | test condition 1 | test value 1 |
      | test variable 2 | test condition 2 | test value 2 |
      | test variable 3 | test condition 3 | test value 3 |
    Then I publish container "1"
     And I change trigger "1" conditions to
      | updated variable 1 | updated condition 1 | updated value 1 |
      | updated variable 2 | updated condition 2 | updated value 2 |
      | updated variable 3 | updated condition 3 | updated value 3 |
     And trigger "1" conditions should look like
      | updated variable 1 | updated condition 1 | updated value 1 |
      | updated variable 2 | updated condition 2 | updated value 2 |
      | updated variable 3 | updated condition 3 | updated value 3 |
    When I restore container "1"
     And trigger "1" conditions should look like
      | test variable 1 | test condition 1 | test value 1 |
      | test variable 2 | test condition 2 | test value 2 |
      | test variable 3 | test condition 3 | test value 3 |