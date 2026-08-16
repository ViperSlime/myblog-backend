describe("Blog full flow", () => {
  it("signs up, signs in, creates a post, and sees it on home", () => {
    const email = `test${Date.now()}@example.com`;

    cy.visit("http://localhost:3000/signup");
    cy.get("input").eq(0).type("Cypress Tester");
    cy.get("input").eq(1).type(email);
    cy.get("input[type=password]").type("test1234");
    cy.contains("Create Account").click();

    cy.contains("Sign In").click();
    cy.get("input").eq(0).type(email);
    cy.get("input[type=password]").type("test1234");
    cy.contains("button", "Sign In").click();

    cy.contains("New Post").click();
    cy.get("input").eq(0).type("Cypress Test Post");
    cy.get("textarea").type("This post was created by an automated test.");
   cy.contains("Publish Post").click();

// Wait for the app to redirect to the new post's own page — confirms creation succeeded
cy.url().should("match", /\/post\/[a-zA-Z0-9]+$/);
cy.contains("Cypress Test Post").should("exist");

cy.visit("http://localhost:3000/");
cy.contains("Cypress Test Post").should("exist");
  });
});