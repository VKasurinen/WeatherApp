describe('Sidebar Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/'); 
    });
  
    it('Renders the current weather information correctly', () => {
      cy.get('[data-testid="sidebar"]').should('exist');
  
      cy.get('[data-testid="weather-image"]').should('exist');
      
      cy.get('[data-testid="temperature"]').should('exist');
      
      cy.get('[data-testid="current-day-time"]').should('exist');
      
      cy.get('[data-testid="weather-description"]').should('exist');
      
      cy.get('[data-testid="wind-speed"]').should('exist');
    });
  
    it('Switches between Celsius and Fahrenheit units and displays correct temperature', () => {
      cy.get('[data-testid="temperature"]').then(($temp) => {
        const initialTemperature = $temp.text();
  
        cy.get('[data-testid="temperature-toggle"]').click();
  
        cy.get('[data-testid="temperature"]').should(($newTemp) => {
          expect($newTemp.text()).not.to.equal(initialTemperature);
        });
      });
    });
  });
  