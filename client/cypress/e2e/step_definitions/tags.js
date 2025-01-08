import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Helper function to create a question
function createQuestion(title, text, tags, username) {
  cy.contains("Ask a Question").click();
  cy.get("#formTitleInput").type(title);
  cy.get("#formTextInput").type(text);
  cy.get("#formTagInput").type(tags);
  cy.get("#formUsernameInput").type(username);
  cy.contains("Post Question").click();
}

// Scenario: Add a question with new tags and verify the tags exist
// Given The user is viewing the homepage "http://localhost:3000"
// When The user adds a new question with tags "test1 test2 test3"
// Then The user should see the tags "test1", "test2", and "test3" listed in the Tags page

Given("The user is viewing the homepage {string}", (url) => {
  cy.visit(url);
});

When("The user adds a new question with tags {string}", (tags) => {
  createQuestion(
    "Sample Question with New Tags",
    "This is a sample question with new tags.",
    tags,
    "testUser"
  );
});

Then(
  "The user should see the tags {string}, {string}, and {string} listed in the Tags page",
  (tag1, tag2, tag3) => {
    cy.contains("Tags").click();
    cy.contains(tag1);
    cy.contains(tag2);
    cy.contains(tag3);
  }
);

// Scenario: Verify all default tags are displayed
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user navigates to the Tags page
//     Then The user should see the tags "react", "javascript", "android-studio", "shared-preferences", "storage", and "website"

When("The user navigates to the Tags page", () => {
  cy.contains("Tags").click();
});

Then(
  "The user should see the tags {string}, {string}, {string}, {string}, {string}, and {string}",
  (tag1, tag2, tag3, tag4, tag5, tag6) => {
    cy.contains(tag1, { matchCase: false });
    cy.contains(tag2, { matchCase: false });
    cy.contains(tag3, { matchCase: false });
    cy.contains(tag4, { matchCase: false });
    cy.contains(tag5, { matchCase: false });
    cy.contains(tag6, { matchCase: false });
  }
);

// Scenario: Check question count associated with tags
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user navigates to the Tags page
//     Then The user should see the correct number of questions associated with each tag

Then(
  "The user should see the correct number of questions associated with each tag",
  () => {
    cy.contains("Tags").click();
    // Verify that question counts are displayed correctly (example logic)
    cy.contains("6 Tags");
    cy.contains("1 question");
    cy.contains("2 questions");
  }
);

// Scenario Outline: View questions under the tag
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user navigates to the Tags page and clicks on the "<tag>" tag
//     Then The user should see questions related to the "<tag>" tag

When(
  "The user navigates to the Tags page and clicks on the {string} tag",
  (tagName) => {
    cy.contains("Tags").click();
    cy.contains(tagName).click();
  }
);

Then("The user should see questions related to the {string} tag", (tagName) => {
  cy.get(".question_tags").each(($el) => {
    cy.wrap($el).should("contain", tagName);
  });
});

// Scenario: Create a new question with a new tag and find it through the tag
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user adds a new question with the tag "test1-tag1"
//     And The user navigates to the Tags page and clicks on the "test1-tag1" tag
//     Then The user should see the newly created question listed under that tag

When("The user adds a new question with the tag {string}", (tag) => {
  createQuestion(
    "Test Question A",
    "This is a test question with a new tag.",
    tag,
    "testUser"
  );
});

Then(
  "The user should see the newly created question listed under that tag",
  () => {
    cy.contains("Tags").click();
    cy.contains("test1-tag1").click();
    cy.contains("Test Question A");
  }
);
