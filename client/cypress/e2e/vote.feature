Feature: Voting on Questions and Answers
  As a user of Fake Stack Overflow,
  I want to vote on questions and answers
  So that I can help highlight high-quality contributions.

Scenario: Voting Attempt by Unauthenticated User
  Given I am not logged in
  When I view a question titled "Object storage for a web application"
  And I try to vote on it
  Then I should see an alert with the message "Please log in to vote."

Scenario: Successful Upvoting
  Given I am logged in as "existinguser" with password "password123"
  When I view a question titled "Object storage for a web application"
  And I upvote on it
  Then I should see the vote count increase by 1

Scenario: Successful Downvoting
  Given I am logged in as "existinguser" with password "password123"
  When I view a question titled "Object storage for a web application"
  And I downvote on it
  Then I should see the vote count decrease by 1  

Scenario: Preventing Duplicate Voting
  Given I am logged in as "existinguser" with password "password123"
  When I view a question titled "Programmatically navigate using React router"
  And then I try to vote it again
  Then I should see an alert with the message "You have already voted on this question"

