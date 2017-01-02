Feature: Create new tag Google Analytics
    As a admin
    I want to create new tag Google Analytics
    So that I can access to the form create new tags

    Background:
        Given I go to homepage
        When I am logged in as a "user1@example.com"
        And I go to page "#/containers/1/tags"

    Scenario: Add new tag Google Analytics
        And I press Add New Tag button
        When I fill tag name field with "tag_Analytics"
        And I choose Google Analytics type template
        And I fill track id field with "234324343343432434321199543433"
        And I press Save Tag button
        Then I should be on page Tags at first containers

    Scenario Outline: Add with wrong data tag Google Analytics
        And I press Add New Tag button
        When I fill tag name field with "<tag_name>"
        And I choose Google Analytics type template
        And I fill track id field with "<track id>"
        And I press Save Tag button
        Then I should be on page tag create

    Examples:
        | tag_name    | track id|
        |             | 12345   |
        | example_tag |         |
        |             |         |

    Scenario: Edit tag Google Analytics
        And I go down page
        And I press Show Actions button for tag Google Analytics
        And I press Edit Tag button for tag Google Analytics
        And I fill tag name field with "edited_Analytics"
        And I fill track id field with "99999999999999999999999"
        And I press Save Tag button
        Then I should see notification about edit tag
        Then I should see edited tag "edited_Analytics" on the list
