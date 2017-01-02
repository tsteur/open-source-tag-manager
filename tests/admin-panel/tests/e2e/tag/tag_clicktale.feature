
Feature: Create new tag clicktale
    As a admin
    I want to create new tag
    So that I can access to the form create new tags

    Background:
        Given I go to homepage
        When I am logged in as a "user1@example.com"
        And I go to page "#/containers/1/tags"

    Scenario: Add new tag click tale
        And I press Add New Tag button
        When I fill tag name field with "Click name"
        And I choose click tale type template
        And I fill partition field with "partition trend"
        And I fill project GUID field with "projectGUID"
        And I press Save Tag button
        Then I should be on page Tags at first containers

    Scenario Outline: Add with wrong data tag click tale
        And I press Add New Tag button
        When I fill tag name field with "Click name"
        And I choose click tale type template
        And I fill partition field with "<partition trend>"
        And I fill project GUID field with "<projectGUID>"
        And I press Save Tag button
        Then I should be on page tag create

    Examples:
        | partition trend    | projectGUID             |
        |                    | example code            |
        | example tag        |                         |
        |                    |                         |

    Scenario: Edit tag click tale
        And I go down page
        And I press Show Actions button for tag click tale
        And I press Edit Tag button for tag click tale
        And I fill tag name field with "edited_tag"
        And I fill partition field with "partition trend"
        And I fill project GUID field with "projectGUID"
        And I press Save Tag button
        Then I should see notification about edit tag
        Then I should see edited tag "edited_tag" on the list


