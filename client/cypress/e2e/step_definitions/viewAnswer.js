import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Helper function to create a question
function createQuestion(title, text, tags, username) {
  cy.contains("Ask a Question").click();
  cy.get("#formTitleInput").type(title);
  cy.get("#formTextInput").type(text);
  cy.get("#formTagInput").type(tags);
  cy.get("#formUsernameInput").type(username);
  cy.contains("Post Question").click();
}

// Helper function to add an answer
function addAnswer(questionTitle, answerText, username) {
  cy.contains(questionTitle).click();
  cy.contains("Answer Question").click();
  cy.get("#answerTextInput").type(answerText);
  cy.get("#answerUsernameInput").type(username);
  cy.contains("Post Answer").click();
}

// Scenario: Create a question and add two answers
//     Given The user is viewing the homepage "http://localhost:3000"
//     And The user has created new question
//     And Add two answers to the new question
//     Then The user should see both answers displayed when viewing the question
Given("The user is viewing the homepage {string}", (url) => {
  cy.visit(url);
});

When("The user has created new question", () => {
  createQuestion(
    "Sample Question for Answers",
    "This is a sample question text.",
    "sample-tag",
    "testUser"
  );
});

And("Add two answers to the new question", () => {
  addAnswer(
    "Sample Question for Answers",
    "This is the first answer.",
    "user1"
  );
  addAnswer(
    "Sample Question for Answers",
    "This is the second answer.",
    "user2"
  );
});

Then(
  "The user should see both answers displayed when viewing the question",
  () => {
    cy.contains("Sample Question for Answers").click();
    cy.get(".answerText").should("have.length", 2);
    cy.get(".answerText").eq(0).should("contain", "This is the first answer.");
    cy.get(".answerText").eq(1).should("contain", "This is the second answer.");
  }
);
