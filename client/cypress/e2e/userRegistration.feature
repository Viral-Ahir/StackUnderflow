Feature: User Registration
  As a new user of Fake Stack Overflow
  I want to register for an account
  So that I can participate in the community by asking and answering questions

  Scenario: Successful user registration
    Given I am on the homepage "http://localhost:3000"
    When I click the "SignUp" button in the header
    And I fill in "newuser123" as the username
    And I fill in "newuser123@example.com" as the email
    And I fill in "password123" as the password
    And I click the "Sign Up" button
    Then I should see "User Profile" in the header

  Scenario: Failed registration with an existing email or username
    Given I am on the homepage "http://localhost:3000"
    When I click the "SignUp" button in the header
    And I fill in "existinguser" as the username
    And I fill in "existinguser@example.com" as the email
    And I fill in "password123" as the password
    And I click the "Sign Up" button
    Then should see an error message "Email or Username already exists"
  
  Scenario: Failed registration with an empty username
    Given I am on the homepage "http://localhost:3000"
    When I click the "SignUp" button in the header
    And I do not fill up the "username"
    And I fill in "newuser1@example.com" as the email
    And I fill in "password123" as the password
    And I click the "Sign Up" button
    Then I should see the 'Please fill out this field' message for the username
  
  Scenario: Failed registration with an empty email
    Given I am on the homepage "http://localhost:3000"
    When I click the "SignUp" button in the header
    And I fill in "newuser1" as the username
    And I do not fill up the "email"
    And I fill in "password123" as the password
    And I click the "Sign Up" button
    Then I should see the 'Please fill out this field' message for the email
  
  Scenario: Failed registration with an empty password
    Given I am on the homepage "http://localhost:3000"
    When I click the "SignUp" button in the header
    And I fill in "newuser1" as the username
    And I fill in "newuser1@example.com" as the email
    And I do not fill up the "password"
    And I click the "Sign Up" button
    Then I should see the 'Please fill out this field' message for the password