describe("My First Test", () => {
  it("Visits The Website", () => {
    cy.visit("http://localhost:8080");
    cy.contains(".date-time-picker").click();
  });
});
