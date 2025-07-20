describe("CaseTracker E2E", () => {
  it("should display Header and TaskList on page load", () => {
    cy.visit("/");

    // cy.contains(/create task/i).should("be.visible");
    cy.get("[data-testid=header]").should("exist");
    cy.get("[data-testid=task-list]").should("exist");
  });
});
