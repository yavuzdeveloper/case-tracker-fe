describe("Create Task Flow", () => {
  beforeEach(() => {
    // Visit the main page before each test
    cy.visit("/");
  });

  it("should open the create task modal", () => {
    // Click the 'Create Task' button to open the modal
    cy.contains(/create task/i).click();

    // Verify the modal with 'Create New Task' text is visible
    cy.contains(/create new task/i).should("be.visible");
  });

  it("should allow entering a title", () => {
    // Open the create task modal
    cy.contains(/create task/i).click();

    // Find the title input, type a value, and verify it
    cy.get("input[name='title']")
      .should("be.visible")
      .type("Cypress Test Task")
      .should("have.value", "Cypress Test Task");
  });

  it("should allow entering a description", () => {
    // Open the create task modal
    cy.contains(/create task/i).click();

    // Find the description textarea, type a value, and verify it
    cy.get("textarea[name='description']")
      .should("be.visible")
      .type("This is a test task.")
      .should("have.value", "This is a test task.");
  });

  it("should allow selecting a status", () => {
    // Open the create task modal
    cy.contains(/create task/i).click();

    // Find the status combobox and open the dropdown
    cy.contains("Status*")
      .parent()
      .find("[role='combobox']")
      .should("exist")
      .click();

    // Select the "To Do" option from the listbox
    cy.get("body")
      .find('[role="listbox"]')
      .should("be.visible")
      .contains("To Do")
      .click();

    // Verify the combobox shows the selected value
    cy.contains("Status*")
      .parent()
      .find("[role='combobox']")
      .should("contain.text", "To Do");
  });

  it("should allow selecting a due date", () => {
    // Open the create task modal
    cy.contains(/create task/i).click();

    // Clear and enter a due date in the datetime-local input
    cy.get("input[type='datetime-local']")
      .should("exist")
      .clear()
      .type("2025-07-20T10:00");

    // Verify the input has the correct value
    cy.get("input[type='datetime-local']").should(
      "have.value",
      "2025-07-20T10:00"
    );
  });

  it("should submit the form and close the modal", () => {
    // Open the create task modal
    cy.contains(/create task/i).click();

    // Fill out the form fields
    cy.get("input[name='title']").type("Cypress Task");
    cy.get("textarea[name='description']").type("This is a description.");
    cy.contains("Status*").parent().find("[role='combobox']").click();
    cy.get("body").find('[role="listbox"]').contains("To Do").click();
    cy.get("input[type='datetime-local']").clear().type("2025-07-20T10:00");

    // Submit the form by clicking the submit button
    cy.get('[data-testid="modal-create-task"]').click();

    // Verify that the modal is closed after submission
    cy.get("[data-slot='dialog-overlay']").should("not.exist");
  });

  it("should show validation error if title is less than 2 characters", () => {
    cy.contains(/create task/i).click();

    // Type a single character (invalid)
    cy.get("input[name='title']").type("A");

    // Try to submit the form
    cy.get('[data-testid="modal-create-task"]').click();

    // Check that the validation message appears
    cy.contains("Title must be at least 2 characters").should("be.visible");
  });

  it("should close modal without saving when close (×) button is clicked", () => {
    // Open the modal by clicking the 'Create Task' button in the header
    cy.get('[data-testid="header-create-task"]').click();

    // Type a title into the input field
    cy.get("input[name='title']").type("Will Not Save");

    // Assert that the modal overlay is visible (modal is open)
    cy.get("[data-slot='dialog-overlay']").should("exist");

    // Click the close (×) button to close the modal
    cy.get('button[data-slot="dialog-close"]').click();

    // Assert that the modal overlay no longer exists (modal is closed)
    cy.get("[data-slot='dialog-overlay']").should("not.exist");

    // Verify that the task with the unsaved title is NOT in the task list
    cy.contains("Will Not Save").should("not.exist");
  });
});
