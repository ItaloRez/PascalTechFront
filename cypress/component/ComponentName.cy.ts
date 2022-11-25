describe("ComponentName.cy.ts", () => {
  it("playground", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=ComponentName]").should("exist");
  });
});
