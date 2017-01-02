Feature: Create new tag Visual Website Optimizer
  As a admin
  I want to create new tag Visual Website Optimizer
  So that I can access to the form create new tags

  Background:
    Given I go to homepage
    When I am logged in as a "user1@example.com"
    And I go to page "#/containers/1/tags"

  Scenario: Add new tag Visual Website Optimizer
    And I press Add New Tag button
    When I fill tag name field with "tag_name"
    And I choose synchronous type tag template
    And I choose VWO type template
    And I fill Account id field with "12345"
    And I should see disabled checkbox Respect visitors privacy
    And I press Save Tag button
    Then I should be on page Tags at first containers

  Scenario Outline: Add with wrong data tag Visual Website Optimizer
    And I press Add New Tag button
    When I fill tag name field with "<tag_name>"
    And I choose synchronous type tag template
    And I choose VWO type template
    And I fill Account id field with "<AccountId>"
    And I press Save Tag button
    Then I should be on page tag create

  Examples:
    | tag_name    | AccountId   |
    |             |     42215   |
    | example_tag |             |
    |             |             |

  Scenario: Edit tag Visual Website Optimizer
    And I go down page
    And I click next page pagination button
    And I press Show Actions button for tag VWO
    And I press Edit Tag button for tag VWO
    And I fill tag name field with "edited_VWO"
    And I fill Account id field with "67890"
    And I press Save Tag button
    Then I should see notification about edit tag
    Then I should see edited tag "edited_VWO" on the list
