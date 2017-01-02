@variables
Feature: As a user i would like to manage my custom variables

    Background:
        Given I am logged in as admin

    Scenario:
        When I create variable for container "1" with data
            | name      | description      | type | value       | options |
            | Variable1 | some description | 1    | ZsdSNVs23nv | []      |
        Then I expect successful create response
            And I expect valid json response
            And response should contains valid variable
        When I get "1" variable
        Then I expect successful response
            And I expect valid json response
            And response should contains valid variable
        When I get variable list for container "1"
        Then I expect successful response
            And I expect valid json response
            And response should have "1" variables
        When I update variable "1" with data
            | name      | description      | type | value       | options |
            | Variable1 | changed          | 1    | ZsdSNVs23nv | []      |
        Then I expect successful response
            And I expect valid json response
            And response should contains valid variable
            And response should contains changed files
                | description |
                | changed     |
        When I delete variable "1"
        Then I expect successful delete response
