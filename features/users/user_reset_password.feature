@users
Feature: As a admin I want call reset password mechanism for certain user

  Background:
    Given I am logged in as admin

  Scenario: Request for resetting password
    When I reset password for user "2"
    Then I expect successful response