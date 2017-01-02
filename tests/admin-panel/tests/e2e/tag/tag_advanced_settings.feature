
Feature: Select advanced settings
    As a admin
    I want to select advanced settings

    Background:
        Given I go to homepage
        When I am logged in as a "user1@example.com"
        And I go to page "#/containers/1/tags"

    Scenario: Select advanced settings
        And I press Add New Tag button
        When I fill tag name field with "Click name"
        And I choose click tale type template
        And I fill partition field with "partition trend"
        And I click icon arrow to open advanced settings
        And I fill priority field with "1"
        And I click checkbox Activate tag
        And I click checkbox Do not fire in a debug mode
        And I click checkbox Respect visitors privacy
        And I fill project GUID field with "projectGUID"
        And I press Save Tag button
        Then I should be on page Tags at first containers
