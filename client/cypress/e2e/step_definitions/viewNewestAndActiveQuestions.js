import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Define the expected order of questions for Newest and Active tabs
const NEWEST_ORDER = [
  "Quick question about storage on android",
  "Object storage for a web application",
  "android studio save string shared preference, start activity and load the saved string",
  "Programmatically navigate using React router",
];
const ACTIVE_ORDER = [
  "Programmatically navigate using React router",
  "android studio save string shared preference, start activity and load the saved string",
  "Quick question about storage on android",
  "Object storage for a web application",
];

// Function to verify the order of questions
function verifyOrder(orderTitles) {
  cy.get(".postTitle").each(($el, index) => {
    cy.wrap($el).should("contain", orderTitles[index]);
  });
}

// Scenario: View all questions in Newest order
//     Given The user can access the homepage "http://localhost:3000"
//     And can see the homepage "All Questions"
//     When The user clicks on the "Newest" tab
//     Then The user should see all questions in the database sorted by the most recently posted questions

Given("The user can access the homepage {string}", (url) => {
  // Visit the specified URL
  cy.visit(url);
});

And("can see the homepage {string}", (pageName) => {
  // Verify that the homepage title is visible
  cy.contains(pageName);
});

When("The user clicks on the {string} tab", (tabName) => {
  // Click on the tab specified in the scenario
  cy.contains(tabName).click();
});

Then(
  "The user should see all questions in the database sorted by the most recently posted questions",
  () => {
    // Check that questions are displayed in the correct Newest order
    verifyOrder(NEWEST_ORDER);
  }
);

// Scenario Outline: Switch between Newest and Active order
//     Given The user is viewing questions in "<currentOrder>"
//     When The user clicks on the "<targetOrder>" tab
//     Then The user should see all questions in the database sorted by the correct order

Given("The user is viewing questions in {string}", (currentOrder) => {
  // Visit the homepage and click the current order tab
  cy.visit("http://localhost:3000");
  cy.contains(currentOrder).click();
});

When("The user clicks on the {string} tab", (targetOrder) => {
  // Click the target order tab to switch views
  cy.contains(targetOrder).click();
});

Then(
  "The user should see all questions in the database sorted by the {string} order",
  (targetOrder) => {
    // Determine and verify the correct order based on the target tab
    const order = targetOrder === "Newest" ? NEWEST_ORDER : ACTIVE_ORDER;
    verifyOrder(order);
  }
);

// Scenario: Maintain Newest order after viewing Tags
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks on the "Tags" menu item
//     And clicks on the "Questions" menu item
//     And clicks on the "Newest" tab
//     Then The user should see all questions in the database sorted by the most recently posted questions

When("The user clicks on the {string} menu item", (menuItem) => {
  // Click the Tags menu item
  cy.contains(menuItem).click();
});

And("clicks on the {string} menu item", (menuItem) => {
  // Click the Questions menu item to navigate back
  cy.contains(menuItem).click();
});

And("clicks on the {string} tab", (tabName) => {
  // Click the Newest tab to view questions in Newest order
  cy.contains(tabName).click();
});

Then(
  "The user should see all questions in the database sorted by the most recently posted questions",
  () => {
    // Verify that questions are sorted by the Newest order
    verifyOrder(NEWEST_ORDER);
  }
);
