describe('Header Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Renders the header with the correct title', () => {
    cy.get('[data-testid="cypress-title"]').should('exist').contains('Weather');
  });

  it('Toggles temperature units between Celsius and Fahrenheit', () => {
    cy.get('[data-testid="temperature-toggle"]').click();
    cy.get('[data-testid="temperature-toggle"]').contains('°F');

    cy.get('[data-testid="temperature-toggle"]').click();
    cy.get('[data-testid="temperature-toggle"]').contains('°C');
  });
});
