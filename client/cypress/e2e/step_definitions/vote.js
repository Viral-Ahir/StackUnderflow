import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Scenario: Voting Attempt by Unauthenticated User
//   Given I am not logged in
//   When I view a question titled "Object storage for a web application"
//   And I try to vote on it
//   Then I should see an alert with the message "Please log in to vote."

Given("I am not logged in", () => {
  cy.visit("http://localhost:3000");
});

When("I view a question titled {string}", (questionTitle) => {
  cy.contains(questionTitle).click();
});

And("I try to vote on it", () => {
  cy.get(".upvoteButton").first().click();
});

Then("I should see an alert with the message {string}", (alertMessage) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(alertMessage);
  });
});

// Scenario: Successful Upvoting
//   Given I am logged in as "existinguser" with password "password123"
//   When I view a question titled "Object storage for a web application"
//   And I upvote on it
//   Then I should see the vote count increase by 1

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

And("I upvote on it", () => {
  cy.get(".upvoteButton").first().click();
});

Then("I should see the vote count increase by 1", () => {
  cy.get(".votesCount").first().should("contain", "1");
});

// Scenario: Successful Downvoting
//   Given I am logged in as "existinguser" with password "password123"
//   When I view a question titled "Object storage for a web application"
//   And I down vote on it
//   Then I should see the vote count decrease by 1

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

And("I downvote on it", () => {
  cy.get(".downvoteButton").first().click();
});

Then("I should see the vote count decrease by 1", () => {
  cy.get(".votesCount").first().should("contain", "-1");
});

// Scenario: Preventing Duplicate Voting
//   Given I am logged in as "existinguser" with password "password123"
//   When I view a question titled "Programmatically navigate using React router"
//   And then I try to vote it again
//   Then I should see an alert with the message "You have already voted on this question"

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

And("then I try to vote it again", () => {
  cy.get(".upvoteButton").first().click();
  cy.wait(4000);
});

Then("I should see an alert with the message {string}", (alertMessage) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(alertMessage);
  });
});
