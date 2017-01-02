@tag_templates
Feature: As a user I want add tag from custom template

  Background:
    Given I am logged in as admin

  Scenario: Create "Google Adwords" tag from custom template
    When I add Google Adwords custom template tag to container "1"
      | name                | conversionId             | conversionLabel                  | remarketingOnly | type                |
      | Tag Name Post 1     | 98652345                 | Conversion Label Google Adwords  | 1               | conversion_tracking |
    Then I expect successful create response
      And I expect valid json response
      And response should contains valid tag

  Scenario: Create "Google Adwords" tag from custom template with missing data
    When I add Google Adwords custom template tag to container "1"
      | name                | conversionId             | conversionLabel                  | remarketingOnly | type                |
      | Tag Name Post 1     |                          | Conversion Label Google Adwords  | 1               | conversion_tracking |
    Then response should contains form errors

  Scenario: Create "Google Analytics" tag from custom template
    When I add Google Analytics custom template tag to container "1"
      | name                | id             |
      | Tag Name Post 1     | 123456         |
    Then I expect successful create response
    And I expect valid json response
    And response should contains valid tag

  Scenario: Create "Google Adwords" tag from custom template with missing data
    When I add Google Analytics custom template tag to container "1"
      | name                | id             |
      | Tag Name Post 1     |                |
    Then response should contains form errors

  Scenario: Create "Piwik" tag from custom template
    When I add Piwik custom template tag to container "1"
      | name                | piwikSiteId    |  piwikUrl        |
      | Tag Name Post 1     | 123456         |  http://7tag.org |
    Then I expect successful create response
    And I expect valid json response
    And response should contains valid tag

  Scenario: Create "Piwik" tag from custom template with missing data
    When I add Piwik custom template tag to container "1"
      | name                | piwikSiteId    |  piwikUrl  |
      | Tag Name Post 1     | 123456         |            |
    Then response should contains form errors

  Scenario: Create "CrazyEgg" tag from custom template
    When I add CrazyEgg custom template tag to container "1"
      | name                | accountNumber  |
      | Tag Name Post 1     | 00405418       |
    Then I expect successful create response
    And I expect valid json response
    And response should contains valid tag

  Scenario: Create "CrazyEgg" tag from custom template with missing data
    When I add CrazyEgg custom template tag to container "1"
      | name                | accountNumber  |
      | Tag Name Post 1     |                |
    Then response should contains form errors

  Scenario: Create "FacebookRetargetingPixel" tag from custom template
    When I add FacebookRetargetingPixel custom template tag to container "1"
      | name                | pixelId        |  event         |
      | Tag Name Post 1     | 37282          |  ViewContent   |
    Then I expect successful create response
    And I expect valid json response
    And response should contains valid tag

  Scenario: Create "FacebookRetargetingPixel" tag from custom template with missing data
    When I add FacebookRetargetingPixel custom template tag to container "1"
      | name                | pixelId        |  event         |
      | Tag Name Post 1     | 37282          |                |
    Then response should contains form errors

  Scenario: Create "Qualaroo" tag from custom template
    When I add Qualaroo custom template tag to container "1"
      | name                | customerId     |  siteToken     |
      | Tag Name Post 1     | 37282          |  9F2           |
    Then I expect successful create response
    And I expect valid json response
    And response should contains valid tag

  Scenario: Create "Qualaroo" tag from custom template with missing data
    When I add Qualaroo custom template tag to container "1"
      | name                | customerId    |  siteToken      |
      | Tag Name Post 1     | 37282         |                 |
    Then response should contains form errors

  Scenario: Create "Sales Manago" tag from custom template
    When I add Sales Manago custom template tag to container "1"
      | name                | smid  |
      | Tag Name Post 1     | 1     |
    Then I expect successful create response
    And I expect valid json response
    And response should contains valid tag

  Scenario: Create "Sales Manago" tag from custom template with missing data
    When I add Sales Manago custom template tag to container "1"
      | name                | smid  |
      | Tag Name Post 1     |      |
    Then response should contains form errors

  Scenario: Create "Marketo" tag from custom template
    When I add Marketo custom template tag to container "1"
      | name                | accountId   |
      | Tag Name Post 1     | 1           |
    Then I expect successful create response
    And I expect valid json response
    And response should contains valid tag

  Scenario: Create "Marketo" tag from custom template with missing data
    When I add Marketo custom template tag to container "1"
      | name                | accountId   |
      | Tag Name Post 1     |             |
    Then response should contains form errors

  Scenario: Create "ClickTale" tag from custom template
    When I add ClickTale custom template tag to container "1"
      | name                | partition    |  guid      |
      | Tag Name Post 1     | www01        |  4473e195-a0e0-4271-96be-144ce4eXXXX |
    Then I expect successful create response
    And I expect valid json response
    And response should contains valid tag

  Scenario: Create "ClickTale" tag from custom template with missing data
    When I add ClickTale custom template tag to container "1"
      | name                | partition    |  guid      |
      | Tag Name Post 1     | www01        |            |
    Then response should contains form errors

  Scenario: Create "Optimizely" tag from custom template
    When I add Optimizely custom template tag to container "1"
      | name                | project_id     |
      | Tag Name Post 1     | 123456         |
    Then I expect successful create response
    And I expect valid json response
    And response should contains valid tag

  Scenario: Create "Optimizely" tag from custom template with missing data
    When I add Optimizely custom template tag to container "1"
      | name                | project_id     |
      | Tag Name Post 1     |                |
    Then response should contains form errors

  Scenario: Create "Visual Website Optimizer" tag from custom template
    When I add Visual Website Optimizer custom template tag to container "1"
      | name                | accountId  |
      | Tag Name Post 1     | 1          |
    Then I expect successful create response
    And I expect valid json response
    And response should contains valid tag

  Scenario: Create "Visual Website Optimizer" tag from custom template with missing data
    When I add Visual Website Optimizer custom template tag to container "1"
      | name                | accountId  |
      | Tag Name Post 1     |            |
    Then response should contains form errors
