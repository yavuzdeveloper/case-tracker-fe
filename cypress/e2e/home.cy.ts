describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render header with Create Task button", () => {
    cy.contains(/create task/i).should("be.visible");
  });

  it("should render search input", () => {
    cy.get("input[placeholder='Search tasks...']").should("exist");
  });

  it("should render task list container", () => {
    cy.get("[data-testid='task-list']").should("exist");
  });

  it("should show empty task state initially", () => {
    cy.contains(/no tasks found/i).should("exist");
  });
});
