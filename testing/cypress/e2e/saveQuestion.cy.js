const { Q3_DESC } = require("../../../server/data/posts_strings.ts");

describe("Save and Unsave Question Scenarios", () => {
  beforeEach(() => {
    // Clear and seed the database before each test
    cy.exec(
      "npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/stackUnderflow"
    );
    cy.exec(
      "npm run --prefix ../server populate_db mongodb://127.0.0.1:27017/stackUnderflow"
    );

    // Visit the home page
    cy.visit("http://localhost:3000");
  });

  it("Scenario 1: Save a Question", () => {
    // Log in the user
    cy.get(".header-button").contains("Login").click();
    cy.get("input#username").type("existinguser");
    cy.get("input#password").type("password123");
    cy.get(".login-button").click();
    cy.get(".header-button").should("contain", "User Profile");

    // Navigate to a question and save it
    cy.contains("Questions").click();
    cy.contains(Q3_DESC).click();
    cy.contains("Save Question").click();

    // Verify that the question is added to the "Saves" list
    cy.contains("Unsave Question").should("exist");
    cy.get(".username-button").contains("User Profile").click();
    cy.contains("Saved Questions").should("exist");
    cy.get(".question_list").should(
      "contain",
      "Object storage for a web application"
    );
  });

  it("Scenario 2: Navigation Button for Saved Questions", () => {
    // Log in the user
    cy.get(".header-button").contains("Login").click();
    cy.get("input#username").type("existinguser");
    cy.get("input#password").type("password123");
    cy.get(".login-button").click();
    cy.get(".header-button").should("contain", "User Profile");

    // Verify the "Saves" button in the navigation menu
    cy.get("#menu_saves").should("exist").click();
    cy.contains("Saved Questions").should("exist");
  });

  it("Scenario 3: Unsave a Question from the Saves Tab", () => {
    // Log in the user and save a question first
    cy.get(".header-button").contains("Login").click();
    cy.get("input#username").type("existinguser");
    cy.get("input#password").type("password123");
    cy.get(".login-button").click();
    cy.get(".header-button").should("contain", "User Profile");

    // Save a question
    cy.contains("Questions").click();
    cy.contains(Q3_DESC).click();
    cy.contains("Save Question").click();
    cy.contains("Unsave Question").should("exist");
    cy.contains("Unsave Question").click();

    // Verify the question is removed from the saved list
    cy.get(".username-button").contains("User Profile").click();
    cy.contains("Saved Questions").should("exist");
    cy.get(".no_question_list").should(
      "not.contain",
      "Object storage for a web application"
    );
  });

  it("Scenario 4: Save Attempt by Unauthenticated User", () => {
    // Attempt to save a question without logging in
    cy.contains("Questions").click();
    cy.contains(Q3_DESC).click();
    cy.contains("Save Question").click();

    // Verify that the user is prompted to log in
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Please log in to save or unsave questions.");
    });

    // Verify that the "Save Question" button still exists
    cy.contains("Save Question").should("exist");
  });
});
