@installer
Feature: Check all steps in install manager
  As a user
  I want to install tag manager
  So that I can access to all steps about configuration

  Scenario: All steps about configuration 7tag
    Given I am on "/install.php"
     Then I should see "7Tag Manager installer"
      And I should see correct setup System
      And I should see correct setup Php Version
      And I should see error setup Database
     When I should see disabled Continue button
     Then I should be on "/install.php"
     When I am on "/install.php/configuration/database"
      And I should see "Database configuration"
     When I fill hostname field with "localhost"
      And I fill database name field with "seventag"
      And I fill user name field with "root"
      And I fill user password field with "1234"
      And I click Continue button
     Then I should be on "/install.php"
      And I should see correct setup Database
     When I click Continue button
     Then I should be on "/install.php/configuration/show"
      And I should see "Please create file inside this path"
     When I click Continue button
     When I fill email field with "user@example.com"
      And I fill password field with "testing"
      And I fill confirm password field with "testing"
      And I click Continue button
     Then I should see "7Tag configured!"
     When I click Start button
     Then I should be on "/#/sign-in"