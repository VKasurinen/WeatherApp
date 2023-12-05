describe('Chart Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('displays hourly chart title', () => {
      cy.contains('.font-semibold', 'Hourly Chart').should('exist');
    });
  
    it('renders the HighchartsReact component', () => {
      cy.get('.highcharts-container').should('exist');
    });
  
    it('fetches and displays temperature data', () => {
      cy.intercept('GET', '**/forecast**').as('fetchData');
  
      cy.wait('@fetchData').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.hourly).to.have.property('time');
        expect(interception.response.body.hourly).to.have.property('temperature_2m');
  
        cy.get('.highcharts-series-group').should('exist');
        
      });
    });
  });
  