@translations
Feature: As a user I want to list all translations from json file

  Scenario: List all translations
    When I request about "en" file
    Then I should get json file with all translations
  Scenario: Missing translations for language code xx
    When I request about "xx" file
    Then I should get exception about not found translation file
