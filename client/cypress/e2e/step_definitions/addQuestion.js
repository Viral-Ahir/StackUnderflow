import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Function to fill out the question form
function fillForm(q) {
  if (q.title) cy.get("#formTitleInput").clear().type(q.title);
  if (q.text) cy.get("#formTextInput").clear().type(q.text);
  if (q.tags) cy.get("#formTagInput").clear().type(q.tags);
  if (q.user) cy.get("#formUsernameInput").clear().type(q.user);
}

// Data for the scenarios
const newQuestion = {
  title: "How to add a question to the database?",
  text: "I am trying to add a question to the database using JavaScript, but I am not sure how to do it. Can someone help me?",
  tags: "database javascript",
  user: "elephantCDE",
};

// Question data
const firstQuestion = {
  title: "How do I use JavaScript closures?",
  text: "Can someone explain closures in JavaScript with examples?",
  tags: "javascript closures",
  user: "user123",
};

const secondQuestion = {
  title: "What is event bubbling in JavaScript?",
  text: "I need an explanation of event bubbling and how to stop it.",
  tags: "javascript events",
  user: "user456",
};

const incompleteQuestions = {
  missingTitle: {
    title: "",
    text: "This question has no title, only text.",
    tags: "javascript",
    user: "user123",
  },
  missingText: {
    title: "Question without text",
    text: "",
    tags: "javascript",
    user: "user123",
  },
  missingTags: {
    title: "Question without tags",
    text: "This question does not have any tags.",
    tags: "",
    user: "user123",
  },
  missingUser: {
    title: "Question without user name",
    text: "This question does not have a user name.",
    tags: "javascript",
    user: "",
  },
};

// Scenario: Successfully add a new question
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks the "Ask a Question" button
//     And fills out the necessary fields
//     And clicks the "Post Question" button
//     Then The user should see the new question on the All Questions page with the correct metadata

Given("The user is viewing the homepage {string}", (url) => {
  cy.visit(url);
});

When("The user clicks the {string} button", (buttonName) => {
  cy.contains(buttonName).click();
});

And("fills out the necessary fields", () => {
  fillForm(newQuestion);
});

And("clicks the {string} button", (buttonName) => {
  cy.contains(buttonName).click();
});

Then(
  "The user should see the new question on the All Questions page with the correct metadata",
  () => {
    cy.contains("All Questions");
    cy.get(".postTitle").first().should("contain", newQuestion.title);
    cy.get(".question_author").first().should("contain", newQuestion.user);
    cy.get(".question_meta").first().should("contain", "0 seconds");
  }
);

// Scenario: Fail to add a question without a title
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks the "Ask a Question" button
//     And does not fill in the question title
//     And clicks the "Post Question" button
//     Then The user should see an error message indicating "Title cannot be empty"

And("does not fill in the question title", () => {
  fillForm(incompleteQuestions.missingTitle);
});

Then(
  'The user should see an error message indicating "Title cannot be empty"',
  () => {
    cy.contains("Title cannot be empty").should("be.visible");
  }
);

// Scenario: Fail to add a question without a user name
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks the "Ask a Question" button
//     And does not provide a username
//     And clicks the "Post Question" button
//     Then The user should see an error message indicating "Username cannot be empty"
And("user does not provide a username", () => {
  fillForm(incompleteQuestions.missingUser);
});

Then(
  'User should see an error message indicating "Username cannot be empty"',
  () => {
    cy.contains("Username cannot be empty").should("be.visible");
  }
);

// Scenario: Fail to add a question without text content
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks the "Ask a Question" button
//     And does not fill in the question text
//     And clicks the "Post Question" button
//     Then The user should see an error message indicating "Question text cannot be empty"
And("does not fill in the question text", () => {
  fillForm(incompleteQuestions.missingText);
});

Then(
  'The user should see an error message indicating "Question text cannot be empty"',
  () => {
    cy.contains("Question text cannot be empty").should("be.visible");
  }
);

// Scenario: Fail to add a question without tags
// Given The user is viewing the homepage "http://localhost:3000"
// When The user clicks the "Ask a Question" button
// And does not enter any tags
// And clicks the "Post Question" button
// Then The user should see an error message indicating "Should have at least 1 tag"

And("does not enter any tags", () => {
  fillForm(incompleteQuestions.missingTags);
});

Then(
  'The user should see an error message indicating "Should have at least 1 tag"',
  () => {
    cy.contains("Should have at least 1 tag").should("be.visible");
  }
);

// Scenario: Successfully add multiple questions and display them in All Questions
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks the "Ask a Question" button
//     And fills out the necessary fields for the first question
//     And clicks the "Post Question" button
//     Then The user should see the first question on the All Questions page with the correct metadata

//     When The user clicks the "Ask a Question" button again
//     And fills out the necessary fields for the second question
//     And clicks the "Post Question" button
//     Then The user should see both questions on the All Questions page with the correct metadata

//     And The questions should be listed in the order they were added

And("fills out the necessary fields for the first question", () => {
  fillForm(firstQuestion);
});

Then(
  "The user should see the first question on the All Questions page with the correct metadata",
  () => {
    cy.contains("All Questions");
    cy.get(".postTitle").first().should("contain", firstQuestion.title);
    cy.get(".question_author").first().should("contain", firstQuestion.user);
  }
);

When("The user clicks the {string} button again", (buttonName) => {
  cy.contains(buttonName).click();
});

And("fills out the necessary fields for the second question", () => {
  fillForm(secondQuestion);
});

Then(
  "The user should see both questions on the All Questions page with the correct metadata",
  () => {
    cy.contains("All Questions");
    cy.get(".postTitle").eq(0).should("contain", secondQuestion.title);
    cy.get(".question_author").eq(0).should("contain", secondQuestion.user);
    cy.get(".postTitle").eq(1).should("contain", firstQuestion.title);
    cy.get(".question_author").eq(1).should("contain", firstQuestion.user);
  }
);

And("The questions should be listed in the order they were added", () => {
  cy.get(".postTitle").eq(0).should("contain", secondQuestion.title);
  cy.get(".postTitle").eq(1).should("contain", firstQuestion.title);
});
