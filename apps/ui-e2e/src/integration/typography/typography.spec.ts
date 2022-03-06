describe('ui: Typography component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=typography--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Typography!');
    });
});
