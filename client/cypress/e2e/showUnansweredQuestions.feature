Feature: Show Unanswered Questions
As a user with read access to fake stack overflow
I want to see all unanswered questions in the database

 Scenario: Show all unanswered questions on user request
    Given The user is viewing the homepage "http://localhost:3000"
    And can see the homepage "All Questions"
    When The user clicks on the "Unanswered" tab
    Then The user should see all questions in the database that have no answers

  Scenario Outline: Return to the Unanswered tab after viewing questions in another order
    Given The user is viewing questions in "<currentOrder>"
    When The user clicks on the "Unanswered" tab
    Then The user should see all questions in the database that have no answers

    Examples:
      | currentOrder |
      | Newest       |
      | Active       |

  Scenario: Return to Unanswered after viewing Tags
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks on the "Tags" menu item
    And clicks on the "Questions" menu item
    And clicks on the "Unanswered" tab
    Then The user should see all questions in the database that have no answers

  Scenario: View questions in unanswered order after asking a question
    Given The user is viewing the homepage "http://localhost:3000"
    And User has created a new question
    When The user clicks on the "Unanswered" tab
    Then The user should see the new question listed in the unanswered questions