Feature: Create new tag facebook
    As a admin
    I want to create new tag facebook
    So that I can access to the form create new tags

    Background:
        Given I go to homepage
        When I am logged in as a "user1@example.com"
        And I go to page "#/containers/1/tags"


    Scenario Outline: Add new tag facebook
        And I press Add New Tag button
        When I fill tag name field with "<tag_name>"
        And I choose facebook type template
        And I fill pixel Id field with "<pixelId>"
        And I select event Search
        And I press Save Tag button
        Then I should be on page Tags at first containers

    Examples:
        | tag_name    | pixelId |
        | example_tag | code    |


    Scenario Outline: Add with wrong data tag facebook
        And I press Add New Tag button
        When I fill tag name field with "<tag_name>"
        And I choose facebook type template
        And I fill pixel Id field with "<pixelId>"
        And I press Save Tag button
        Then I should be on page tag create

    Examples:
        | tag_name    | pixelId |
        |             | code    |
        | example_tag |         |
        |             |         |

    Scenario: Edit tag facebook
        And I go down page
        And I press Show Actions button for tag facebook
        And I press Edit Tag button for tag facebook
        And I fill tag name field with "edited_facebook"
        And I fill pixel Id field with "1"
        And I press Save Tag button
        Then I should see notification about edit tag
        Then I should see edited tag "edited_facebook" on the list

