
Feature: Create new tigger
    As a admin
    I want to create new tigger
    So that I can access to the form create new tigger

    Background:
        Given I go to homepage
        When I am logged in as a "user1@example.com"
        And I go to page "#/containers/1/tags"

    Scenario: Fires on add new tigger
        And I press Add New Tag button
        When I fill tag name field with "tag name"
        When I fill tag name field with "Click tiggername"
        And I choose click tale type template
        And I fill partition field with "partition trend"
        And I fill project GUID field with "projectGUID"
        And I click button Add new tigger
        And I fill name of tigger field with "Page View "
        And I select tigger loads Page View
        And I click button Add a conditions
        And I select Conditions
        Then I click button Add Tigger

        And I click button Add new tigger
        And I fill name of tigger field with "Click "
        And I select tigger loads Click
        And I click button Add a conditions
        And I select Conditions
        Then I click button plus conditions
        And I select Conditions
        Then I click button minus conditions
        Then I click button Add Tigger

        And I fill name of tigger field with "Form "
        And I select tigger loads Form submission
        And I click button Add a conditions
        Then I click button Cancel Tigger

        And I click button Add new tigger
        And I fill name of tigger field with "Event "
        And I select tigger loads Event
        Then I click button Cancel Tigger

        And I press Save Tag button
        Then I should be on page Tags at first containers

    Scenario: Fires on choose an existing tigger
        And I press Add New Tag button
        When I fill tag name field with "tag name"
        When I fill tag name field with "Click tiggername"
        And I choose click tale type template
        And I fill partition field with "partition trend"
        And I fill project GUID field with "projectGUID"
        And I click button Add new tigger
        And I fill name of tigger field with "Page View "
