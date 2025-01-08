import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Define the expected order for the Unanswered tab
const UNANSWERED_ORDER = [];

// Function to verify the order of unanswered questions
function verifyUnansweredOrder() {
  if (UNANSWERED_ORDER.length === 0) {
    // If UNANSWERED_ORDER is empty, there should be no post titles displayed
    cy.get(".postTitle").should("not.exist");
  } else {
    // Otherwise, verify the titles are in the expected order
    cy.get(".postTitle").each(($el, index) => {
      cy.wrap($el).should("contain", UNANSWERED_ORDER[index]);
    });
  }
}

// Scenario: Show all unanswered questions on user request
//     Given The user is viewing the homepage "http://localhost:3000"
//     And can see the homepage "All Questions"
//     When The user clicks on the "Unanswered" tab
//     Then The user should see all questions in the database that have no answers
Given("The user is viewing the homepage {string}", (url) => {
  // Visit the specified URL
  cy.visit(url);
});

And("can see the homepage {string}", (pageName) => {
  // Verify that the homepage title is visible
  cy.contains(pageName);
});

When("The user clicks on the {string} tab", (tabName) => {
  // Click on the Unanswered tab
  cy.contains(tabName).click();
});

Then(
  "The user should see all questions in the database that have no answers",
  () => {
    // Verify that questions are sorted by the Unanswered order
    verifyUnansweredOrder();
  }
);

// Scenario Outline: Return to the Unanswered tab after viewing questions in another order
//     Given The user is viewing questions in "<currentOrder>"
//     When The user clicks on the "Unanswered" order
//     Then The user should see all questions in the database that have no answers

Given("The user is viewing questions in {string}", (currentOrder) => {
  // Visit the homepage and click the current order tab
  cy.visit("http://localhost:3000");
  cy.contains(currentOrder).click();
});

// Scenario: Return to Unanswered after viewing Tags
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks on the "Tags" menu item
//     And clicks on the "Questions" menu item
//     And clicks on the "Unanswered" tab
//     Then The user should see all questions in the database that have no answers

When("The user clicks on the {string} menu item", (menuItem) => {
  // Click the Tags menu item
  cy.contains(menuItem).click();
});

And("clicks on the {string} menu item", (menuItem) => {
  // Click the Questions menu item to navigate back
  cy.contains(menuItem).click();
});

And("clicks on the {string} tab", (tabName) => {
  // Click the Unanswered tab to view questions
  cy.contains(tabName).click();
});

// Scenario: View questions in unanswered order after asking a question
//     Given The user is viewing the homepage "http://localhost:3000"
//     And User has created a new question
//     When The user clicks on the "Unanswered" tab
//     Then The user should see the new question listed in the unanswered questions

And("User has created a new question", () => {
  // Create a new question without any answers
  cy.contains("Ask a Question").click();
  cy.get("#formTitleInput").type("Test Question A");
  cy.get("#formTextInput").type("Test Question A Text");
  cy.get("#formTagInput").type("javascript");
  cy.get("#formUsernameInput").type("mks0");
  cy.contains("Post Question").click();
});

Then(
  "The user should see the new question listed in the unanswered questions",
  () => {
    // Verify that the new question appears in the Unanswered list
    cy.get(".postTitle").should("contain", "Test Question A");
  }
);
