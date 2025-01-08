import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Function to create a question
function createQuestion(title, text, tags, username) {
  cy.contains("Ask a Question").click();
  cy.get("#formTitleInput").type(title);
  cy.get("#formTextInput").type(text);
  cy.get("#formTagInput").type(tags);
  cy.get("#formUsernameInput").type(username);
  cy.contains("Post Question").click();
}

// Function to create an initial answer
function createInitialAnswer() {
  cy.get("#answerTextInput").type("This is the initial answer.");
  cy.get("#answerUsernameInput").type("initialAnswerUser");
  cy.contains("Post Answer").click();
}

// Scenario: Successfully add a new answer
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks on the question that has no answers
//     And The user clicks the "Answer Question" button
//     And fills out the answer text and username
//     And clicks the "Post Answer" button
//     Then The user should see the new answer displayed under the question with the correct metadata

Given("The user is viewing the homepage {string}", (url) => {
  cy.visit(url);
});

When("The user clicks on the question that has no answers", () => {
  // Assumes that a question is already created and available on the page
  createQuestion(
    "Sample Question for Answer",
    "This is a sample question.",
    "javascript",
    "testUser"
  );
  cy.contains("Sample Question for Answer").click();
});

And("The user clicks the {string} button", (buttonName) => {
  cy.contains(buttonName).click();
});

And("fills out the answer text and username", () => {
  cy.get("#answerTextInput").type("This is a new answer.");
  cy.get("#answerUsernameInput").type("answerUser");
});

Then(
  "The user should see the new answer displayed under the question with the correct metadata",
  () => {
    cy.get(".answerText").first().should("contain", "This is a new answer.");
    cy.get(".answerAuthor").first().should("contain", "answerUser");
    cy.contains("0 seconds ago").should("be.visible");
  }
);

// Scenario: Successfully add another answer to an already answered question
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks on the question that already has an answer
//     And The user clicks the "Answer Question" button
//     And fills out the new answer text and username
//     And clicks the "Post Answer" button
//     Then The user should see the newly added answer

When("The user clicks on the question that already has an answer", () => {
  // Create a question and add an initial answer if not already done
  createQuestion(
    "Question with Existing Answer",
    "This question already has one answer.",
    "javascript",
    "testUser"
  );
  cy.contains("Question with Existing Answer").click();
  cy.contains("Answer Question").click();
  createInitialAnswer();
});

And("fills out the new answer text and username", () => {
  cy.get("#answerTextInput").type("This is the second answer.");
  cy.get("#answerUsernameInput").type("secondAnswerUser");
});

Then("The user should see the newly added answer", () => {
  const answers = ["This is the second answer.", "This is the initial answer."];
  cy.get(".answerText").each(($el, index) => {
    cy.contains(answers[index]);
  });
  cy.contains("secondAnswerUser");
  cy.contains("0 seconds ago");
});

// Scenario: Fail to add an answer without text content
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks on the question that has no answers
//     And The user clicks the "Answer Question" button
//     And does not fill in the answer text
//     And fills out the username
//     And clicks the "Post Answer" button
//     Then The user should see an error message indicating "Answer text cannot be empty"

And("does not fill in the answer text", () => {
  cy.get("#answerTextInput").should("be.empty");
});

And("fills out the username", () => {
  cy.get("#answerUsernameInput").type("answerUser");
});

Then(
  'The user should see an error message indicating "Answer text cannot be empty"',
  () => {
    cy.contains("Post Answer").click();
    cy.contains("Answer text cannot be empty").should("be.visible");
  }
);

// Scenario: Fail to add an answer without a username
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks on the question that has no answers
//     And The user clicks the "Answer Question" button
//     And fills out the answer text
//     And does not provide a username
//     And clicks the "Post Answer" button
//     Then The user should see an error message indicating "Username cannot be empty"

And("fills out the answer text", () => {
  cy.get("#answerTextInput").type("This is an answer without a username.");
});

And("does not provide a username", () => {
  cy.get("#answerUsernameInput").should("be.empty");
});

Then(
  'The user should see an error message indicating "Username cannot be empty"',
  () => {
    cy.contains("Post Answer").click();
    cy.contains("Username cannot be empty").should("be.visible");
  }
);
