  Feature: Login
  As a user
  I want to login to the dashboard
  So that I can access the dashboard

    Scenario Outline: Login validation
        Given I go to homepage
        When I fill in login field with "<user>"
        And I fill in password field with "<user_password>"
        And I press Submit button
        Then I should see "<notification>" text
        And I should be on page "<page>"

    Examples:
        | user              | user_password | notification                                      | page           |
        |                   | user_password | Login or password is incorrect. Please try again. | #/sign-in      |
        | user              |               | Login or password is incorrect. Please try again. | #/sign-in      |
        |                   |               | Login or password is incorrect. Please try again. | #/sign-in      |
