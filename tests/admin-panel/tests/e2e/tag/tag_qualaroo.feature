
Feature: Create new tag Qualaroo
    As a admin
    I want to create new tag Qualaroo
    So that I can access to the form create new tags

    Background:
        Given I go to homepage
        When I am logged in as a "user1@example.com"
        And I go to page "#/containers/1/tags"

    Scenario: Add new tag Qualaroo
        And I press Add New Tag button
        When I fill tag name field with "tag_name"
        And I choose Qualaroo type template
        And I fill Customer id field with "Customer id"
        And I fill Site token field with "Site token"
        And I press Save Tag button
        Then I should be on page Tags at first containers

    Scenario Outline: Add with wrong data tag Qualaroo
        And I press Add New Tag button
        When I fill tag name field with "<tag_name>"
        And I choose Qualaroo type template
        And I fill Customer id field with "<Customer id>"
        And I fill Site token field with "<Site token>"
        And I press Save Tag button
        Then I should be on page tag create

    Examples:
        | tag_name    | Customer id |Site token|
        |             |     45      |  1234211 |
        | example_tag |     32      |          |
        | example_tag |             |  1234211 |
        |             |             |          |

    Scenario: Edit tag Qualaroo
        And I go down page
        And I press Show Actions button for tag Qualaroo
        And I press Edit Tag button for tag Qualaroo
        And I fill tag name field with "edited_Qualaroo"
        And I fill Customer id field with "123AD"
        And I fill Site token field with "13fd54gd55ddd44"
        And I press Save Tag button
        Then I should see notification about edit tag
        Then I should see edited tag "edited_Qualaroo" on the list
