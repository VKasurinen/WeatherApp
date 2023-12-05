describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('loads the weekly highlight section', () => {
    cy.get('[data-testid=weekly-highlight]').should('exist');
  });


  it('displays correct weather image for each day', () => {
    for (let i = 0; i < 7; i++) {
      cy.get(`[data-testid=day-${i}-weather-image]`).should('have.attr', 'src').should('include', '/Images/');
    }
  });
  

  it('displays today as the first day', () => {
    cy.get('[data-testid=day-0-name]').should('contain', 'Today');
  });


  it('shows the chart section', () => {
    cy.get('[data-testid=chart]').should('exist');
  });
});

  