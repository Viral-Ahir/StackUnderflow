import {
  Given,
  When,
  Then,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";

Before(() => {
  cy.exec(
    "npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/stackUnderflow"
  );
  cy.exec(
    "npm run --prefix ../server populate_db mongodb://127.0.0.1:27017/stackUnderflow"
  );
});

After(() => {
  cy.exec(
    "npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/stackUnderflow"
  );
});

// Scenario: Successful user registration
//     Given I am on the homepage "http://localhost:3000"
//     When I click the "SignUp" button in the header
//     And I fill in "newuser123" as the username
//     And I fill in "newuser123@example.com" as the email
//     And I fill in "password123" as the password
//     And I click the "Sign Up" button
//     Then I should see "User Profile" in the header

Given("I am on the homepage {string}", (url) => {
  cy.visit(url);
});

When("I click the {string} button in the header", (buttonText) => {
  cy.get(".header-button").contains(buttonText).click();
});

And("I fill in {string} as the username", (username) => {
  cy.get("input#username").type(username);
});

And("I fill in {string} as the email", (email) => {
  cy.get("input#email").type(email);
});

And("I fill in {string} as the password", (password) => {
  cy.get("input#password").type(password);
});

And("I click the {string} button", () => {
  cy.get(".register-button").click();
});

Then("I should see {string} in the header", (text) => {
  cy.get(".header-button").should("contain", text);
});

// Scenario: Failed registration with an existing email or username
//     Given I am on the homepage "http://localhost:3000"
//     When I click the "SignUp" button in the header
//     And I fill in "existinguser" as the username
//     And I fill in "existinguser@example.com" as the email
//     And I fill in "password123" as the password
//     And I click the "Sign Up" button
//     Then should see an error message "Email or Username already exists"

Then("should see an error message {string}", (errorMessage) => {
  cy.contains(errorMessage).should("be.visible");
});

// Scenario: Failed registration with an empty username
//     Given I am on the homepage "http://localhost:3000"
//     When I click the "SignUp" button in the header
//     And I do not fill up the "username"
//     And I fill in "newuser1@example.com" as the email
//     And I fill in "password123" as the password
//     And I click the "Sign Up" button
//     Then it should display the "Please fill out this field" message for the username

And('I do not fill up the "username"', () => {
  // Ensure the username field is empty
  cy.get("input#username").should("be.empty");
});

Then(
  "I should see the 'Please fill out this field' message for the username",
  () => {
    cy.get("input#username").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  }
);

// Scenario: Failed registration with an empty email
//     Given I am on the homepage "http://localhost:3000"
//     When I click the "SignUp" button in the header
//     And I fill in "newuser1" as the username
//     And I do not fill up the "email"
//     And I fill in "password123" as the password
//     And I click the "Sign Up" button
//     Then it should display the "Please fill out this field" message for the email

And('I do not fill up the "email"', () => {
  // Ensure the username field is empty
  cy.get("input#email").should("be.empty");
});

Then(
  "I should see the 'Please fill out this field' message for the email",
  () => {
    cy.get("input#email").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  }
);

// Scenario: Failed registration with an empty password
//     Given I am on the homepage "http://localhost:3000"
//     When I click the "SignUp" button in the header
//     And I fill in "newuser1" as the username
//     And I fill in "newuser1@example.com" as the email
//     And I do not fill up the "password"
//     And I click the "Sign Up" button
//     Then it should display the "Please fill out this field" message for the password

And('I do not fill up the "password"', () => {
  // Ensure the username field is empty
  cy.get("input#username").should("be.empty");
});

Then(
  "I should see the 'Please fill out this field' message for the password",
  () => {
    cy.get("input#password").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  }
);
