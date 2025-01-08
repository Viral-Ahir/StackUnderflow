import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Scenario: Successful login with valid credentials
//     Given I am on the homepage "http://localhost:3000"
//     When I click the "Login" button in the header
//     And I fill in "existinguser" as the username
//     And I fill in "password123" as the password
//     And I click the "Login" button
//     Then I should see "User Profile" in the header

Given("I am on the homepage {string}", (url) => {
  cy.visit(url);
});

// Step Definitions for clicking buttons in the header
When("I click the {string} button in the header", (buttonText) => {
  cy.get(".header-button").contains(buttonText).click();
});

// Step Definitions for filling in the login form
And("I fill in {string} as the username", (username) => {
  cy.get("input#username").type(username);
});

And("I fill in {string} as the password", (password) => {
  cy.get("input#password").type(password);
});

// Step Definitions for clicking the login button
And("I click the Login button", () => {
  cy.get(".login-button").click();
});

// Step Definitions for checking successful login
Then("I should see {string} in the header", (text) => {
  cy.get(".header-button").should("contain", text);
});

// Scenario: Failed login with incorrect password
//     Given I am on the homepage "http://localhost:3000"
//     When I click the "Login" button in the header
//     And I fill in "existinguser" as the username
//     And I fill in "wrongpassword" as the password
//     And I click the "Login" button
//     Then I should see the error message "Incorrect password"

//   Scenario: Failed login with non-existent account
//     Given I am on the homepage "http://localhost:3000"
//     When I click the "Login" button in the header
//     And I fill in "nonexistentuser" as the username
//     And I fill in "password123" as the password
//     And I click the "Login" button
//     Then I should see the error message "Account does not exist"

// Step Definitions for checking error messages
Then("I should see the error message {string}", (errorMessage) => {
  cy.contains(errorMessage).should("be.visible");
});

// Scenario: Successful logout
//     Given I am logged in with "existinguser" and "password123"
//     When I click the "Logout" button in the header
//     Then I should see "Login" and "SignUp" in the header

// Step Definitions for logging out
Given("I am logged in with {string} and {string}", (username, password) => {
  cy.visit("http://localhost:3000");
  cy.get(".header-button").contains("Login").click();
  cy.get("input#username").type(username);
  cy.get("input#password").type(password);
  cy.get(".login-button").click();
  cy.get(".header-button").should("contain", "User Profile");
});

When("I click the {string} button in the header", (buttonText) => {
  cy.get(".header-button").contains(buttonText).click();
});

Then(
  "I should see {string} and {string} in the header",
  (loginText, signUpText) => {
    cy.get(".header-button").should("contain", loginText);
    cy.get(".header-button").should("contain", signUpText);
  }
);

// Scenario: Failed login with empty username
//     Given I am on the homepage "http://localhost:3000"
//     When I click the "Login" button in the header
//     And I fill in "password123" as the password
//     And I do not fill up the "username"
//     And I click the "Login" button
//     Then it should display the "Please fill out this field" message for the username

//   Scenario: Failed login with empty password
//     Given I am on the homepage "http://localhost:3000"
//     When I click the "Login" button in the header
//     And I fill in "existinguser" as the username
//     And I do not fill up the "password"
//     And I click the "Login" button
//     Then it should display the "Please fill out this field" message for the password

// Step Definitions for checking browser validation messages
And("I do not fill up the {string}", (field) => {
  cy.get(`input#${field}`).should("be.empty");
});

Then(
  "it should display the {string} message for the {string}",
  (message, field) => {
    cy.get(`input#${field}`).then(($input) => {
      expect($input[0].validationMessage).to.eq(message);
    });
  }
);
