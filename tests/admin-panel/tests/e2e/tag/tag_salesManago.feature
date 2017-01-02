
Feature: Create new tag Sales Manago
    As a admin
    I want to create new tag Sales Manago
    So that I can access to the form create new tags

    Background:
        Given I go to homepage
        When I am logged in as a "user1@example.com"
        And I go to page "#/containers/1/tags"

    Scenario: Add new tag Sales Manago
        And I press Add New Tag button
        When I fill tag name field with "tag_name"
        And I choose Sales Manago type template
        And I fill Sales Manago field with "ID Sales Manago"
        And I press Save Tag button
        Then I should be on page Tags at first containers

    Scenario Outline: Add with wrong data tag Sales Manago
        And I press Add New Tag button
        When I fill tag name field with "<tag_name>"
        And I choose Sales Manago type template
        And I fill Sales Manago field with "<ID Sales Manago>"
        And I press Save Tag button
        Then I should be on page tag create

    Examples:
        | tag_name    | ID Sales Manago |
        |             |     45          |
        | example_tag |                 |
        |             |                 |

    Scenario: Edit tag Sales Manago
        And I go down page
        And I press Show Actions button for tag Sales Manago
        And I press Edit Tag button for tag Sales Manago
        And I fill tag name field with "edited_Sales Manago"
        And I fill Sales Manago field with "ID Sales Manago"
        And I press Save Tag button
        Then I should see notification about edit tag
        Then I should see edited tag "edited_Sales Manago" on the list
