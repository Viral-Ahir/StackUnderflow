Feature: Create Question and Verify Answers
  As a user of Fake Stack Overflow
  I want to create a question and add two answers
  So that I can verify both answers are displayed when viewing the question

  Scenario: Create a question and add two answers
    Given The user is viewing the homepage "http://localhost:3000"
    When The user has created new question
    And Add two answers to the new question
    Then The user should see both answers displayed when viewing the question
