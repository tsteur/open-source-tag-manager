Feature: Preview & debug mode
  As a admin
  I want to add websites with installed container
  So that I can get preview container on websites in debug mode

    Background:
      Given I go to homepage
       When I am logged in as a "user1@example.com"
        And I go to page "#/containers/1/tags"
        And I go to Debug tab

    Scenario: Add websites with installed container
        And I click Add website button
       Then I should see disabled Debug button
        And I fill website url field with ""
       When I click website form submit button
       Then I should see required field
#      Then I should see notification about error new website form

       When I fill website url field with "http://onet.pl"
        And I click website form submit button
       Then I should see notification about add new website
        And I should see enabled Debug button
       Then I should see Preview and Debug navbar
       When I click Publish container button
       Then I should not see Preview and Debug navbar
       When I click add another website button
       Then I can add second website
       When I click remove second website button
       Then I should not see second website on the list





