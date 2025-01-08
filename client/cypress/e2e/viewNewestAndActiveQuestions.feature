Feature: View Questions by Newest and Active Order
  As a user of Fake Stack Overflow
  I want to view all questions sorted by the Newest and Active order
  So that I can stay updated with the latest questions and the most recently answered questions

  Scenario: View all questions in Newest order
    Given The user can access the homepage "http://localhost:3000"
    And can see the homepage "All Questions"
    When The user clicks on the "Newest" tab
    Then The user should see all questions in the database sorted by the most recently posted questions

  Scenario Outline: Switch between Newest and Active order
    Given The user is viewing questions in "<initialOrder>"
    When The user clicks on the "<targetOrder>" tab
    Then The user should see all questions in the database sorted by the "<targetOrder>" order

    Examples:
      | initialOrder | targetOrder |
      | Newest       | Active      |
      | Active       | Newest      |

  Scenario: Maintain Newest order after viewing Tags
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks on the "Tags" menu item
    And clicks on the "Questions" menu item
    And clicks on the "Newest" tab
    Then The user should see all questions in the database sorted by the most recently posted questions