@variables
Feature: As a user i would like to manage my custom variables

    Background:
        Given I am logged in as admin

    Scenario:
        When I get variable type list
        Then I expect successful response
            And I expect valid json response
