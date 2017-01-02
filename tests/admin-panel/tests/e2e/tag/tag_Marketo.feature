
Feature: Create new tag Marketo
    As a admin
    I want to create new tag Marketo
    So that I can access to the form create new tags

    Background:
        Given I go to homepage
        When I am logged in as a "user1@example.com"
        And I go to page "#/containers/1/tags"

    Scenario: Add new tag Marketo
        And I press Add New Tag button
        When I fill tag name field with "tag_Marketo"
        And I choose Marketo type template
        And I fill Marketo Account Id field with "Marketo ID"
        And I press Save Tag button
        Then I should be on page Tags at first containers

    Scenario Outline: Add with wrong data tag Marketo
        And I press Add New Tag button
        When I fill tag name field with "<tag_name>"
        And I choose Marketo type template
        And I fill Marketo Account Id field with "<Marketo ID>"
        And I press Save Tag button
        Then I should be on page tag create

    Examples:
        | tag_name    | Marketo ID  |
        |             | 12345       |
        | example_tag |             |
        |             |             |

    Scenario: Edit tag Marketo
        And I go down page
        And I press Show Actions button for tag Marketo
        And I press Edit Tag button for tag Marketo
        And I fill tag name field with "edited_Marketo"
        And I fill Marketo Account Id field with "124AD"
        And I press Save Tag button
        Then I should see notification about edit tag
        Then I should see edited tag "edited_Marketo" on the list
