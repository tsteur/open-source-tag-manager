Feature: Create new tag crazyegg
    As a admin
    I want to create new tag crazyegg
    So that I can access to the form create new tags

    Background:
        Given I go to homepage
        When I am logged in as a "user1@example.com"
        And I go to page "#/containers/1/tags"

    Scenario: Add new tag crazyegg
        And I press Add New Tag button
        When I fill tag name field with "creazy egg name"
        And I choose crazyegg type template
        And I fill account number field with "345632"
        And I press Save Tag button
        Then I should be on page Tags at first containers

    Scenario Outline: Add with wrong data tag crazyegg
        And I press Add New Tag button
        When I fill tag name field with "Click name"
        And I choose crazyegg type template
        And I fill account number field with "<number>"
        And I press Save Tag button
        Then I should be on page tag create

    Examples:
        | number             |
        |                    |

    Scenario: Edit tag crazyegg
        And I go down page
        And I press Show Actions button for tag crazyegg
        And I press Edit Tag button for tag crazyegg
        And I fill tag name field with "edited_crazyegg"
        And I fill account number field with "99999"
        And I press Save Tag button
        Then I should see notification about edit tag
        Then I should see edited tag "edited_crazyegg" on the list
