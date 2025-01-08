Feature: Posting a New Question
  As a user with write access to Fake Stack Overflow
  I want to post a new question to the application
  So that I can seek answers from the community

  Scenario: Successfully add a new question
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And fills out the necessary fields
    And clicks the "Post Question" button
    Then The user should see the new question on the All Questions page with the correct metadata

  Scenario: Fail to add a question without a title
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And does not fill in the question title
    And clicks the "Post Question" button
    Then The user should see an error message indicating "Title cannot be empty"
  
  Scenario: Fail to add a question without a user name
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And user does not provide a username
    And clicks the "Post Question" button
    Then User should see an error message indicating "Username cannot be empty"

  Scenario: Fail to add a question without text content
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And does not fill in the question text
    And clicks the "Post Question" button
    Then The user should see an error message indicating "Question text cannot be empty"

  Scenario: Fail to add a question without tags
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And does not enter any tags
    And clicks the "Post Question" button
    Then The user should see an error message indicating "Should have at least 1 tag"

  Scenario: Successfully add multiple questions and display them in All Questions
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And fills out the necessary fields for the first question
    And clicks the "Post Question" button
    Then The user should see the first question on the All Questions page with the correct metadata

    When The user clicks the "Ask a Question" button again
    And fills out the necessary fields for the second question
    And clicks the "Post Question" button
    Then The user should see both questions on the All Questions page with the correct metadata

    And The questions should be listed in the order they were added