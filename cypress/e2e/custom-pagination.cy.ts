describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

// describe("CustomPagination E2E", () => {
//   it("should disable previous on first page and next on last page", () => {
//     cy.visit("/");

//     cy.get("[data-testid=pagination-previous]").should(
//       "have.class",
//       "cursor-not-allowed"
//     );

//     // "Page 1 of 5" yazısı görünmeli
//     cy.contains("Page 1 of 5").should("be.visible");

//     // İleri'ye tıklayıp "Page 2 of 5" gösterilmeli
//     cy.get("[data-testid=pagination-next]").click();
//     cy.contains("Page 2 of 5").should("be.visible");
//   });
// });
