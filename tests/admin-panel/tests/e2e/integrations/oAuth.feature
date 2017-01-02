Feature: Integration with oAuth
  As a user
  I want to share my container for external services
  So that I can generate token and create user

  Scenario: Create/Edit new an integration

    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I go to page "#/integration"
      And I should see empty integration list
      And I click Create Integration button
     Then I go to page "#/integration/create"
     When I fill in integration name field with "integration_test2"
      And I fill in integration user email field with "integration@example.com"
      And I click Save Integration button
     Then I should see notification about created integration
      And I should be on page "#/integration/2/edit"
      And I should see disabled integration clientId
      And I should see disabled integration clientSecret
      And I should see disabled integration email
      And I fill in integration name field with "integration_test"
      And I click Save Integration button
     When I go to page "#/containers-edit/1"
      And I click permissions tab
     Then I should see integration user on container permission list
     When I go to page "#/users"
     Then I should not see integration user on users list
     When I go to page "#/integration"
     Then I should see added integration on the list


  Scenario Outline: Check validation in form Create new an integration

    Given I go to homepage
     When I am logged in as a "user1@example.com"
      And I go to page "#/integration"
      And I should see empty integration list
      And I click Create Integration button
     Then I go to page "#/integration/create"
     When I fill in integration name field with "<name>"
      And I fill in integration user email field with "<email>"
      And I click Save Integration button
     Then I should see notification about error form


    Examples:
    | name              | email                   |
    |                   |                         |
    | integration_test  |                         |
    |                   | integration@example.com |

