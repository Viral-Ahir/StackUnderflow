Feature: Commenting on Questions and Answers
  As a user of Fake Stack Overflow
  I want to comment on questions and answers
  So that I can engage in discussions and promote quality content

  Scenario: Successful Comment Option Display
    Given I am logged in as "existinguser" with password "password123"
    And I am on the answer page for question "Quick question about storage on android"
    Then I should see an option to "Post Comment"

  Scenario: Comment Attempt by Unauthenticated User
    Given I am not logged in
    When I view a question titled "Object storage for a web application"
    And I type the comment "This is a good Question"
    And I click the "Post Comment" button
    Then I should see an alert with the message "Please log in to post comments."

  Scenario: Blank Comment Submission
    Given I am logged in as "existinguser" with password "password123"
    When I view a question titled "Programmatically navigate using React router"
    And I click the "Post Comment" button without typing anything in the comment
    Then I should see an alert with the message "Comment cannot be empty."
