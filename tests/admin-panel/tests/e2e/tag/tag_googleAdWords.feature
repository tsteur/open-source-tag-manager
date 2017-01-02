
Feature: Create new tag Google AdWords
    As a admin
    I want to create new tag Google AdWords
    So that I can access to the form create new tags

    Background:
        Given I go to homepage
        When I am logged in as a "user1@example.com"
        And I go to page "#/containers/1/tags"

    Scenario Outline: Add new tag Google AdWords Conversion
        And I press Add New Tag button
        When I fill tag name field with "<tag_name>"
        And I choose Google AdWords type template
        And I press Conversion tracking button
        And I fill conversion Id field with "<id>"
        And I fill conversion label field with "<label>"
        And I fill conversion value field with "<value>"
        And I press Save Tag button
        Then I should be on page Tags at first containers

    Examples:
        | tag_name    | id | label | value |
        | example_tag | 32 | test  |       |
        | example_tag | 32 | test  | 45    |


    Scenario Outline: Add with wrong data tag Google AdWords Conversion
        And I press Add New Tag button
        When I fill tag name field with "<tag_name>"
        And I choose Google AdWords type template
        And I press Conversion tracking button
        And I fill conversion Id field with "<id>"
        And I fill conversion label field with "<label>"
        And I fill conversion value field with "<value>"
        And I press Save Tag button
        Then I should be on page tag create

    Examples:
        | tag_name    | id | label | value |
        |             |    | test  |       |
        |             | 32 |       |       |
        | example_tag |    | test  |       |
        |             |    |       |       |

    Scenario: Edit tag Google AdWords Conversion
        And I go down page
        And I press Show Actions button for tag Google AdWords
        And I press Edit Tag button for tag Google AdWords
        And I fill tag name field with "edited_AdWords"
        And I press Conversion tracking button
        And I fill conversion Id field with "12"
        And I fill conversion label field with "test"
        And I fill conversion value field with "test"
        And I press Save Tag button
        Then I should see notification about edit tag
        Then I should see edited tag "edited_AdWords" on the list

    Scenario Outline: Add new tag Google AdWords Remarketing
        And I press Add New Tag button
        When I fill tag name field with "<tag_name>"
        And I choose Google AdWords type template
        And I press Remarketing button
        And I fill conversion Id field with "<id>"
        And I fill conversion label field with "<label>"
        And I press Save Tag button
        Then I should be on page Tags at first containers

    Examples:
    | tag_name    | id | label |
    | example_tag | 32 | test  |
    | example_tag | 32 |       |


    Scenario Outline: Add with wrong data tag Google AdWords Remarketing
        And I press Add New Tag button
        When I fill tag name field with "<tag_name>"
        And I choose Google AdWords type template
        And I press Remarketing button
        And I fill conversion Id field with "<id>"
        And I fill conversion label field with "<label>"
        And I press Save Tag button
        Then I should be on page tag create

    Examples:
        | tag_name    | id | label |
        |             |    | test  |
        |             | 32 |       |
        | example_tag |    | test  |
        |             |    |       |

    Scenario: Edit tag Google AdWords Remarketing
        And I go down page
        And I press Show Actions button for tag Google AdWords
        And I press Edit Tag button for tag Google AdWords
        And I fill tag name field with "edited_AdWords"
        And I press Remarketing button
        And I fill conversion Id field with "12"
        And I fill conversion label field with "test"
        And I press Save Tag button
        Then I should see notification about edit tag
        Then I should see edited tag "edited_AdWords" on the list
