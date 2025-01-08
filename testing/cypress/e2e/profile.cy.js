describe("ProfileView and EditProfileView Tests", () => {
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

    // Log in before each test
    cy.get(".header-button").contains("Login").click();
    cy.get("input#username").type("existinguser");
    cy.get("input#password").type("password123");
    cy.get(".login-button").click();

    // Ensure the user is logged in
    cy.get(".header-button").should("contain", "User Profile");

    // Navigate to the Profile page
    cy.get(".username-button").contains("User Profile").click();
  });

  it("should display a message if there are no saved questions", () => {
    // Check for the message indicating no saved questions
    cy.contains("No saved questions").should("exist");
  });

  it("should navigate to the Edit Profile page when the Edit Profile button is clicked", () => {
    // Click the "Edit Profile" button
    cy.contains("Edit Profile").click();
    cy.contains("Edit Profile").should("exist");
  });

  it("should update the profile successfully when valid data is submitted", () => {
    // Click the "Edit Profile" button
    cy.contains("Edit Profile").click();

    // Enter new data and click "Save Changes"
    cy.get("#username").clear().type("updatedUser");
    cy.get("#bio").clear().type("Updated bio");
    cy.contains("Save Changes").click();

    // Verify that the changes are reflected on the Profile page
    cy.get(".username-button").contains("User Profile").click();
    cy.contains("updatedUser").should("exist");
    cy.contains("Updated bio").should("exist");
  });

  it("should display an error message if the username is empty", () => {
    // Click the "Edit Profile" button
    cy.contains("Edit Profile").click();

    // Clear the username field and try to save
    cy.get("#username").clear();
    cy.contains("Save Changes").click();

    // Check for the error message
    cy.get("#username").then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
      expect($input[0].validationMessage).to.equal(
        "Please fill out this field."
      );
    });
  });
});
