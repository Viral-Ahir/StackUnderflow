Feature: Search Questions by Search String or Tag
  As a user of Fake Stack Overflow
  I want to search for questions using a specific search string or tag name(s)
  So that I can easily find relevant questions

  Scenario: Search for a question using a search string
    Given The user is viewing the homepage "http://localhost:3000"
    And The user posts a new question
    When The user searches for the text "sample"
    Then The user should see questions containing the text sample search string

  Scenario: Search for questions using a single tag
    Given The user is viewing the homepage "http://localhost:3000"
    And The user posts a new question
    When The user searches for the tag "[sample-tag]"
    Then The user should see all questions containing the tag [sample-tag]

  Scenario: Search for questions using multiple tags
    Given The user is viewing the homepage "http://localhost:3000"
    And The user posts a new question
    When The user searches for the tags "[tag1] [tag2]"
    Then The user should see questions that are tagged with either [tag1] or [tag2]

  Scenario: Search for a question using a non-existent search string
    Given The user is viewing the homepage "http://localhost:3000"
    And The user posts a new question
    When The user searches for the text "nonExistentText"
    Then The user should see no questions displayed

  Scenario: Search for questions using a non-existent tag
    Given The user is viewing the homepage "http://localhost:3000"
    And The user posts a new question
    When The user searches for the tag "[nonExistentTag]"
    Then The user should see no questions displayed