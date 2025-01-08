import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Scenario: View message when there are no saved questions
//     Given I am logged in as "existinguser" with password "password123"
//     When I navigate to the "User Profile" page
//     Then I should see a message "No saved questions"

Given(
  "I am logged in as {string} with password {string}",
  (username, password) => {
    // Visit the home page
    cy.visit("http://localhost:3000");

    // Log in with the provided username and password
    cy.get(".header-button").contains("Login").click();
    cy.get("input#username").type(username);
    cy.get("input#password").type(password);
    cy.get(".login-button").click();

    // Ensure the user is logged in
    cy.get(".header-button").should("contain", "User Profile");
  }
);

When("I navigate to the {string} page", (pageName) => {
  // Click on the button or link that navigates to the "User Profile" page
  cy.get(".username-button").contains(pageName).click();
});

Then("I should see a message {string}", (message) => {
  cy.contains(message).should("exist");
});

// Scenario: Navigate to Edit Profile page
//     Given I am logged in as "existinguser" with password "password123"
//     When I navigate to the "User Profile" page
//     And I click the "Edit Profile" button on the "User Profile" page
//     Then I should be on the "Edit Profile" page

And("I click the {string} button on the {string} page", (buttonText, page) => {
  cy.contains(buttonText).click();
  cy.contains(page).should("exist");
});

Then("I should be on the {string} page", (page) => {
  // Verify that the Edit Profile page is displayed
  cy.contains(page).should("exist");
});

// Scenario: Successfully update profile with valid data
//     Given I am logged in as "existinguser" with password "password123"
//     When I navigate to the "User Profile" page
//     And I click the "Edit Profile" button on the "User Profile" page
//     And I change the username to "updatedUser" and the bio to "Updated bio"
//     And I click the "Save Changes" button
//     Then I should see the updated username "updatedUser" and bio "Updated bio" on the "User Profile" page

And(
  "I change the username to {string} and the bio to {string}",
  (username, bio) => {
    cy.get("#username").clear().type(username);
    cy.get("#bio").clear().type(bio);
  }
);

And("I click the {string} button", (buttonText) => {
  cy.contains(buttonText).click();
});

Then(
  "I should see the updated username {string} and bio {string} on the {string} page",
  (username, bio, page) => {
    cy.get(".username-button").contains("User Profile").click();
    cy.contains(username).should("exist");
    cy.contains(bio).should("exist");
  }
);

// Scenario: Display error message when username is empty
//     Given I am logged in as "existinguser" with password "password123"
//     When I navigate to the "User Profile" page
//     And I click the "Edit Profile" button on the "User Profile" page
//     And I clear the username field and click "Save Changes"
//     Then I should see an error message "Please fill out this field."

And("I clear the username field and click {string}", (buttonText) => {
  cy.get("#username").clear();
  cy.contains(buttonText).click();
});

Then("I should see an error message {string}", (message) => {
  cy.get("#username").then(($input) => {
    expect($input[0].checkValidity()).to.be.false;
    expect($input[0].validationMessage).to.equal(message);
  });
});

// Scenario: Create a new user and try changing the username to an existing one
//     Given I am on the homepage "http://localhost:3000"
//     When I click the "SignUp" button in the header
//     And I fill in "newuser123" as the username
//     And I fill in "newuser123@example.com" as the email
//     And I fill in "password123" as the password
//     And I click the "Sign Up" button
//     Then I should see "User Profile" in the header

//     When I navigate to the "User Profile" page
//     And I click the "Edit Profile" button on the "User Profile" page
//     And I change the username to "existinguser"
//     And I click the "Save Changes" button
//     Then I should see an error message "Username already taken by another user" on the "Edit Profile" page

When("I click the {string} button in the header", (buttonText) => {
  cy.get(".header-button").contains(buttonText).click();
});

And("I fill in {string} as the username", (username) => {
  cy.get("input#username").type(username);
});

And("I fill in {string} as the email", (email) => {
  cy.get("input#email").type(email);
});

And("I fill in {string} as the password", (password) => {
  cy.get("input#password").type(password);
});

And("I click the {string} button", (buttonText) => {
  cy.get(".register-button").click();
});

Then("I should see {string} in the header", (text) => {
  cy.get(".header-button").should("contain", text);
});

And("I change the username to {string}", (newUsername) => {
  cy.get("#username").clear().type(newUsername);
});

Then(
  "I should see an error message {string} on the {string} page",
  (errorMessage, pageName) => {
    cy.contains(pageName).should("exist");
    cy.contains(errorMessage).should("be.visible");
  }
);
