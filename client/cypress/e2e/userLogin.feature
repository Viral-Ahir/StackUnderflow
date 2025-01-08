Feature: User Login
  As a user of Fake Stack Overflow
  I want to be able to log in and log out of the application
  So that I can access my user profile and participate in the community

  Scenario: Successful login with valid credentials
    Given I am on the homepage "http://localhost:3000"
    When I click the "Login" button in the header
    And I fill in "existinguser" as the username
    And I fill in "password123" as the password
    And I click the Login button
    Then I should see "User Profile" in the header

  Scenario: Failed login with incorrect password
    Given I am on the homepage "http://localhost:3000"
    When I click the "Login" button in the header
    And I fill in "existinguser" as the username
    And I fill in "wrongpassword" as the password
    And I click the Login button
    Then I should see the error message "Incorrect password"

  Scenario: Failed login with non-existent account
    Given I am on the homepage "http://localhost:3000"
    When I click the "Login" button in the header
    And I fill in "nonexistentuser" as the username
    And I fill in "password123" as the password
    And I click the Login button
    Then I should see the error message "Account does not exist"

  Scenario: Successful logout
    Given I am logged in with "existinguser" and "password123"
    When I click the "Logout" button in the header
    Then I should see "Login" and "SignUp" in the header

  Scenario: Failed login with empty username
    Given I am on the homepage "http://localhost:3000"
    When I click the "Login" button in the header
    And I fill in "password123" as the password
    And I do not fill up the "username"
    And I click the Login button
    Then it should display the "Please fill out this field." message for the "username"

  Scenario: Failed login with empty password
    Given I am on the homepage "http://localhost:3000"
    When I click the "Login" button in the header
    And I fill in "existinguser" as the username
    And I do not fill up the "password"
    And I click the Login button
    Then it should display the "Please fill out this field." message for the "password"
