Feature: Create new tag Custom Synchronous
  As a admin
  I want to create new tag Custom Synchronous
  So that I can access to the form create new tags

  Background:
    Given I go to homepage
    When I am logged in as a "user1@example.com"
    And I go to page "#/containers/1/tags"

  Scenario: Add new tag Custom Synchronous
    And I press Add New Tag button
    When I fill tag name field with "tag_name"
    And I choose synchronous type tag template
    And I choose Custom Synchronous type template
    And I fill html code with "tests"
    When I click checkbox Respect visitors privacy
    Then I should see check Respect visitors privacy
    When I click checkbox Respect visitors privacy
    And I should see uncheck Respect visitors privacy
    And I press Save Tag button
   Then I should see notification about create new tag
    Then I should be on page Tags at first containers


  Scenario Outline: Add with wrong data tag Custom Synchronous
    And I press Add New Tag button
    When I fill tag name field with "<tag_name>"
    And I choose synchronous type tag template
    And I choose Custom Synchronous type template
    And I fill html code with "<code>"
    And I press Save Tag button
    Then I should see notification about error form


  Examples:
    | tag_name    |     code    |
    |             |     42215   |
    | example_tag |             |
    |             |             |

  Scenario: Edit tag Custom Synchronous
    And I go down page
    And I click next page pagination button
    And I press Show Actions button for tag Custom Synchronous
    And I press Edit Tag button for tag Custom Synchronous
    And I fill tag name field with "edited_CustomSynchronous"
    And I fill html code with "tests"
    And I press Save Tag button
    Then I should see notification about edit tag
    Then I should see edited tag "edited_CustomSynchronous" on the list
