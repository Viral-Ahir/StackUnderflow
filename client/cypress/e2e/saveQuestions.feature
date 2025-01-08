Feature: Save and Unsave Questions
  As a user of Fake Stack Overflow
  I want to save and unsave questions
  So that I can easily revisit questions that I find important

  Scenario: Save a Question
    Given I logged in as "existinguser" with password "password123"
    When I navigated to the "Questions" page
    And I click on the question "Quick question about storage on android"
    And I click the "Save Question" button
    Then the question should appear in my "Saved Questions" list

  Scenario: View Saved Questions through the SideNavBar
    Given I logged in and saved a question
    When I click the "Saves" menu item in the SideNavBar
    Then the question should appear in my "Saved Questions" list

  Scenario: Unsave a Question from the Saves Tab
    Given I logged in and saved a question
    And I click the "Unsave Question" button
    Then I should see the "Save Question" button
    Then the question should no longer appear in my "Saved Questions" list

  Scenario: Save Attempt by Unauthenticated User
    Given I am not logged in
    When I navigated to the "Questions" page
    And I click on the question "Quick question about storage on android"
    And I click the "Save Question" button
    Then I should see an alert with the message "Please log in to save or unsave questions."
    And the "Save Question" button should still be visible
