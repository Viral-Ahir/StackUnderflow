describe("User Registration and Login", () => {
  beforeEach(() => {
    // Clear and reset the database before each test
    cy.exec(
      "npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/stackUnderflow"
    );
    // Populate the database before each test
    cy.exec(
      "npm run --prefix ../server populate_db mongodb://127.0.0.1:27017/stackUnderflow"
    );
  });

  afterEach(() => {
    // Clear the database after each test
    cy.exec(
      "npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/stackUnderflow"
    );
  });

  // Test for successful user registration
  it("should successfully register a new user", () => {
    cy.visit("http://localhost:3000");
    cy.get(".header-button").contains("SignUp").click();

    // Fill out the registration form
    cy.get("input#username").type("newuser123");
    cy.get("input#email").type("newuser123@example.com");
    cy.get("input#password").type("password123");
    cy.get(".register-button").click();

    // Check if the user is redirected and logged in
    cy.get(".header-button").should("contain", "User Profile");
  });

  // Test for duplicate user registration
  it("should fail to register with an existing email or username", () => {
    cy.visit("http://localhost:3000");
    cy.get(".header-button").contains("SignUp").click();

    // Fill out the form with existing username and email
    cy.get("input#username").type("existinguser");
    cy.get("input#email").type("existinguser@example.com");
    cy.get("input#password").type("password123");
    cy.get(".register-button").click();

    // Check for an error message
    cy.contains("Email or Username already exists").should("be.visible");
  });

  // Test for successful login
  it("should log in successfully with valid credentials", () => {
    cy.visit("http://localhost:3000");
    cy.get(".header-button").contains("Login").click();

    // Fill out the login form
    cy.get("input#username").type("existinguser");
    cy.get("input#password").type("password123");
    cy.get(".login-button").click();

    // Check for successful login
    cy.get(".header-button").should("contain", "User Profile");
  });

  // Test for login with incorrect password
  it("should fail to log in with an incorrect password", () => {
    cy.visit("http://localhost:3000");
    cy.get(".header-button").contains("Login").click();

    // Fill out the form with incorrect password
    cy.get("input#username").type("existinguser");
    cy.get("input#password").type("wrongpassword");
    cy.get(".login-button").click();

    // Check for an error message
    cy.contains("Incorrect password").should("be.visible");
  });

  // Test for login with non-existent account
  it("should fail to log in with a non-existent account", () => {
    cy.visit("http://localhost:3000");
    cy.get(".header-button").contains("Login").click();

    // Fill out the form with a non-existent username
    cy.get("input#username").type("nonexistentuser");
    cy.get("input#password").type("password123");
    cy.get(".login-button").click();

    // Check for an error message
    cy.contains("Account does not exist").should("be.visible");
  });

  // Test for successful logout
  it("should log out successfully", () => {
    // First, log in successfully
    cy.visit("http://localhost:3000");
    cy.get(".header-button").contains("Login").click();
    cy.get("input#username").type("existinguser");
    cy.get("input#password").type("password123");
    cy.get(".login-button").click();

    // Check for successful login
    cy.get(".header-button").should("contain", "User Profile");

    // Click the logout button
    cy.get(".header-button").contains("Logout").click();

    // Check if the user is logged out
    cy.get(".header-button").should("contain", "Login");
    cy.get(".header-button").should("contain", "SignUp");
  });

  // Test for empty username during login
  it("should display the 'Please fill out this field' message if the username is empty during login", () => {
    cy.visit("http://localhost:3000");
    cy.get(".header-button").contains("Login").click();

    // Leave the username field empty and fill out the password
    cy.get("input#password").type("password123");
    cy.get(".login-button").click();

    // Check for the browser's default validation message
    cy.get("input#username").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  // Test for empty password during login
  it("should display the 'Please fill out this field' message if the password is empty during login", () => {
    cy.visit("http://localhost:3000");
    cy.get(".header-button").contains("Login").click();

    // Leave the password field empty and fill out the username
    cy.get("input#username").type("existinguser");
    cy.get(".login-button").click();

    // Check for the browser's default validation message
    cy.get("input#password").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });
});
