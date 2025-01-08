import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given(
  "I logged in as {string} with password {string}",
  (username, password) => {
    cy.visit("http://localhost:3000");
    cy.get(".header-button").contains("Login").click();
    cy.get("input#username").type(username);
    cy.get("input#password").type(password);
    cy.get(".login-button").click();
    cy.get(".header-button").should("contain", "User Profile");
  }
);

Given("I logged in and saved a question", () => {
  cy.visit("http://localhost:3000");
  cy.get(".header-button").contains("Login").click();
  cy.get("input#username").type("existinguser");
  cy.get("input#password").type("password123");
  cy.get(".login-button").click();
  cy.get(".header-button").should("contain", "User Profile");

  // Navigate to Questions page and save the first question
  cy.contains("Questions").click();
  cy.get(".postTitle").first().click();
  cy.contains("Save Question").click();
  cy.contains("Unsave Question").should("be.visible");
});

Given("I am not logged in", () => {
  cy.visit("http://localhost:3000");
});

When("I navigated to the {string} page", (pageName) => {
  cy.contains(pageName).click();
});

When("I click on the question {string}", (questionTitle) => {
  cy.contains(questionTitle).click();
});

When("I click the {string} button", (buttonText) => {
  cy.contains(buttonText).click();
});

When("I click the {string} menu item in the SideNavBar", (menuItem) => {
  cy.get(`#menu_${menuItem.toLowerCase()}`).click();
});

Then("I should see the {string} button", (buttonText) => {
  cy.contains(buttonText).should("exist");
});

Then("I should see the {string} page", (pageName) => {
  cy.contains(pageName).should("exist");
});

Then("the question should appear in my {string} list", (listName) => {
  cy.get(".username-button").contains("User Profile").click();
  cy.contains(listName).should("exist");
  cy.get(".question_list").should(
    "contain",
    "Quick question about storage on android"
  );
});

Then("the question should no longer appear in my {string} list", (listName) => {
  cy.get(".username-button").contains("User Profile").click();
  cy.contains(listName).should("exist");
  cy.get(".no_question_list").should(
    "not.contain",
    "Quick question about storage on android"
  );
});

Then("I should see an alert with the message {string}", (alertMessage) => {
  cy.on("window:alert", (text) => {
    expect(text).to.contains(alertMessage);
  });
});

Then("the {string} button should still be visible", (buttonText) => {
  cy.contains(buttonText).should("exist");
});
