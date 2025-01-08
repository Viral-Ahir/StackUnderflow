import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Helper function to create a question
function createQuestionData(title, text, tags, username) {
  cy.contains("Ask a Question").click();
  cy.get("#formTitleInput").type(title);
  cy.get("#formTextInput").type(text);
  cy.get("#formTagInput").type(tags);
  cy.get("#formUsernameInput").type(username);
  cy.contains("Post Question").click();
}

// Scenario: Search for a question using a search string
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user searches for the text "sample"
//     Then The user should see questions containing the text sample search string
Given("The user is viewing the homepage {string}", (url) => {
  cy.visit(url);
});

And("The user posts a new question", () => {
  // Seed data with a question that contains "sample search string"
  createQuestionData(
    "Question with sample search string",
    "This is a question containing sample search string for testing.",
    "sample-tag tag1",
    "user1"
  );

  // Seed data with a question that has multiple tags
  createQuestionData(
    "Question with multiple tags",
    "This is a question tagged with multiple tags.",
    "tag1 tag2",
    "user2"
  );
});

When("The user searches for the text {string}", (searchText) => {
  cy.get("#searchBar").type(`${searchText}{enter}`);
});

Then(
  "The user should see questions containing the text sample search string",
  () => {
    cy.get(".postTitle").should("have.length", 1);
    cy.get(".postTitle").each(($el) => {
      cy.wrap($el).should("contain", "Question with sample search string");
    });
  }
);

// Scenario: Search for questions using a single tag
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user searches for the tag "[sample-tag]"
//     Then The user should see all questions containing the tag [sample-tag]
When("The user searches for the tag {string}", (tag) => {
  cy.get("#searchBar").type(`${tag}{enter}`);
});

Then(
  "The user should see all questions containing the tag [sample-tag]",
  () => {
    cy.get(".postTitle").should("have.length", 1);
    cy.get(".postTitle").each(($el) => {
      cy.wrap($el).should("contain", "Question with sample search string");
    });
  }
);

// Scenario: Search for questions using multiple tags
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user searches for the tags "[tag1] [tag2]"
//     Then The user should see questions that are tagged with either [tag1] or [tag2]

When("The user searches for the tags {string}", (tags) => {
  cy.get("#searchBar").type(`${tags}{enter}`);
});

Then(
  "The user should see questions that are tagged with either [tag1] or [tag2]",
  () => {
    const expectedTitles = [
      "Question with multiple tags",
      "Question with sample search string",
    ];

    cy.get(".postTitle").should("have.length", expectedTitles.length); // Check the number of displayed questions
    cy.get(".postTitle").each(($el, index) => {
      cy.wrap($el).should("contain", expectedTitles[index]); // Check each title
    });
  }
);

// Scenario: Search for a question using a non-existent search string
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user searches for the text "nonExistentText"
//     Then The user should see no questions displayed

//   Scenario: Search for questions using a non-existent tag
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user searches for the tag "[nonExistentTag]"
//     Then The user should see no questions displayed

Then("The user should see no questions displayed", () => {
  cy.get(".postTitle").should("have.length", 0);
});
