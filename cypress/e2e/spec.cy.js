describe('Student Search Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/'); // Adjust the path if your dashboard is under a different route
    cy.wait(1000); // Give time for students to load
  });

  it('1. Searches for a full name exactly', () => {
    cy.get('input[placeholder="Search students by name..."]').type('John Doe');
    cy.get('[aria-label="Search"]').click();
    cy.contains('John Doe').should('exist');
  });

  it('2. Searches by partial name', () => {
    cy.get('input[placeholder="Search students by name..."]').type('jo');
    cy.get('[aria-label="Search"]').click();
    cy.get('.MuiDataGrid-row').should('have.length.at.least', 1);
  });

  it('3. Is case-insensitive', () => {
    cy.get('input[placeholder="Search students by name..."]').type('ALICE');
    cy.get('[aria-label="Search"]').click();
    cy.contains(/alice/i).should('exist');
  });

  it('4. Trims whitespace in search input', () => {
    cy.get('input[placeholder="Search students by name..."]').type('   michael   ');
    cy.get('[aria-label="Search"]').click();
    cy.contains('Michael').should('exist');
  });

  it('5. Shows all students when input is cleared', () => {
    cy.get('input[placeholder="Search students by name..."]').type('Anna');
    cy.get('[aria-label="Clear"]').click();
    cy.get('.MuiDataGrid-row').should('have.length.greaterThan', 1);
  });

  it('6. Handles Enter key for search', () => {
    cy.get('input[placeholder="Search students by name..."]').type('Chris{enter}');
    cy.contains('Chris').should('exist');
  });

  it('7. Handles special characters gracefully', () => {
    cy.get('input[placeholder="Search students by name..."]').type('@#!');
    cy.get('[aria-label="Search"]').click();
    cy.get('.MuiDataGrid-row').should('have.length', 0);
  });

  it('8. Shows empty result for non-matching name', () => {
    cy.get('input[placeholder="Search students by name..."]').type('nonexistingname');
    cy.get('[aria-label="Search"]').click();
    cy.get('.MuiDataGrid-row').should('have.length', 0);
  });

  it('9. Supports unicode characters in names', () => {
    cy.get('input[placeholder="Search students by name..."]').type('José');
    cy.get('[aria-label="Search"]').click();
    cy.contains('José').should('exist');
  });

  it('10. Displays full list when input is empty and search triggered', () => {
    cy.get('input[placeholder="Search students by name..."]').clear();
    cy.get('[aria-label="Search"]').click();
    cy.get('.MuiDataGrid-row').should('have.length.greaterThan', 1);
  });
});