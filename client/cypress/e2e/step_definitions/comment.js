import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Scenario: Successful Comment Option Display
//     Given I am logged in as "existinguser" with password "password123"
//     And I am on the answer page for question "Quick question about storage on android"
//     Then I should see an option to "Post Comment"
Given(
  "I am logged in as {string} with password {string}",
  (username, password) => {
    cy.visit("http://localhost:3000");
    cy.get(".header-button").contains("Login").click();
    cy.get("input#username").type(username);
    cy.get("input#password").type(password);
    cy.get(".login-button").click();
    cy.get(".header-button").should("contain", "User Profile");
  }
);

And("I am on the answer page for question {string}", (questionTitle) => {
  cy.contains(questionTitle).click();
});

Then("I should see an option to {string}", (option) => {
  cy.contains(option).should("exist");
});

// Scenario: Comment Attempt by Unauthenticated User
// Given I am not logged in
// When I view a question titled "Quick question about storage on android"
// And I type the comment "This is a good Question"
// And I click the "Post Comment" button
// Then I should see an alert with the message "Please log in to post comments."

Given("I am not logged in", () => {
  cy.visit("http://localhost:3000");
});

When("I view a question titled {string}", (questionTitle) => {
  cy.contains(questionTitle).click();
});

And("I type the comment {string}", (commentText) => {
  cy.get(".commentInputBox").first().type(commentText);
});

And("I click the {string} button", (buttonName) => {
  cy.contains(buttonName).click();
});

Then("I should see an alert with the message {string}", (alertMessage) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(alertMessage);
  });
});

// Scenario: Blank Comment Submission
// Given I am logged in as "existinguser" with password "password123"
// When I view a question titled "Programmatically navigate using React router"
// And I click the "Post Comment" button without typing anything in the comment
// Then I should see an alert with the message "Comment cannot be empty."

Given(
  "I am logged in as {string} with password {string}",
  (username, password) => {
    cy.visit("http://localhost:3000");
    cy.get(".header-button").contains("Login").click();
    cy.get("input#username").type(username);
    cy.get("input#password").type(password);
    cy.get(".login-button").click();
    cy.get(".header-button").should("contain", "User Profile");
  }
);

When("I view a question titled {string}", (questionTitle) => {
  cy.contains(questionTitle).click();
});

And(
  "I click the {string} button without typing anything in the comment",
  (buttonName) => {
    cy.contains(buttonName).click();
  }
);

Then("I should see an alert with the message {string}", (alertMessage) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(alertMessage);
  });
});
