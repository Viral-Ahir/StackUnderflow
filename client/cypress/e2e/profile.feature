Feature: Viewing and Editing User Profile
  As a logged-in user of Fake Stack Overflow
  I want to view and edit my profile
  So that I can update my account details and manage my saved questions

  Scenario: View message when there are no saved questions
    Given I am logged in as "existinguser" with password "password123"
    When I navigate to the "User Profile" page
    Then I should see a message "No saved questions"

  Scenario: Navigate to Edit Profile page
    Given I am logged in as "existinguser" with password "password123"
    When I navigate to the "User Profile" page
    And I click the "Edit Profile" button on the "User Profile" page
    Then I should be on the "Edit Profile" page

  Scenario: Successfully update profile with valid data
    Given I am logged in as "existinguser" with password "password123"
    When I navigate to the "User Profile" page
    And I click the "Edit Profile" button on the "User Profile" page
    And I change the username to "updatedUser" and the bio to "Updated bio"
    And I click the "Save Changes" button
    Then I should see the updated username "updatedUser" and bio "Updated bio" on the "User Profile" page

  Scenario: Display error message when username is empty
    Given I am logged in as "existinguser" with password "password123"
    When I navigate to the "User Profile" page
    And I click the "Edit Profile" button on the "User Profile" page
    When I clear the username field and click "Save Changes"
    Then I should see an error message "Please fill out this field."

  Scenario: Create a new user and try changing the username to an existing one
    Given I am on the homepage "http://localhost:3000"
    When I click the "SignUp" button in the header
    And I fill in "newuser123" as the username
    And I fill in "newuser123@example.com" as the email
    And I fill in "password123" as the password
    And I click the "Sign Up" button
    Then I should see "User Profile" in the header

    When I navigate to the "User Profile" page
    And I click the "Edit Profile" button on the "User Profile" page
    And I change the username to "existinguser"
    And I click the "Save Changes" button
    Then I should see an error message "Username already taken by another user" on the "Edit Profile" page