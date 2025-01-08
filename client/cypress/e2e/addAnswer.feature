Feature: Posting a New Answer
  As a user with write access to Fake Stack Overflow
  I want to post a new answer to a question
  So that I can share my knowledge with the community

  Scenario: Successfully add a new answer
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks on the question that has no answers
    And The user clicks the "Answer Question" button
    And fills out the answer text and username
    And clicks the "Post Answer" button
    Then The user should see the new answer displayed under the question with the correct metadata
  
  Scenario: Successfully add another answer to an already answered question
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks on the question that already has an answer
    And The user clicks the "Answer Question" button
    And fills out the new answer text and username
    And clicks the "Post Answer" button
    Then The user should see the newly added answer

  Scenario: Fail to add an answer without text content
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks on the question that has no answers
    And The user clicks the "Answer Question" button
    And does not fill in the answer text
    And fills out the username
    And clicks the "Post Answer" button
    Then The user should see an error message indicating "Answer text cannot be empty"

  Scenario: Fail to add an answer without a username
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks on the question that has no answers
    And The user clicks the "Answer Question" button
    And fills out the answer text
    And does not provide a username
    And clicks the "Post Answer" button
    Then The user should see an error message indicating "Username cannot be empty"
