import React from 'react';
import SignUp from '../auth/SignUp';

describe('signup Component', () => {
  beforeEach(() => {
    cy.mount(<SignUp />); 
  });

  it('renders the signup form', () => {
      cy.get('[data-testid="username"]').should('be.visible')
      cy.get('[data-testid="password"]').should('be.visible')
  });
    it('shows an error message and the signup button is disabled when the passwords do not match', () => {
        cy.get('[data-testid=username-input]').type("someone");
        cy.get('[data-testid=password-input]').type("password");
        cy.get('[data-testid=confirm_password-input]').type("notpassword");
        expect('[data-testid=password_error]').to.exist;
        expect(cy.get('#signup-button').should('be.disabled'));
    });
    it('shows an error message when the password is invalid', () => {
        cy.get('[data-testid=username-input]').type("someone");
        cy.get('[data-testid=password-input]').type("pass");
        cy.get('[data-testid=confirm_password-input]').type("pass");
        cy.get('[data-testid=email-input]').type("someone@someone.com");
        cy.get('[data-testid=firstname-input]').type("Someone");
        cy.get('[data-testid=lastname-input]').type("Someone");
        expect('[data-testid=passwordvalid_error]').to.exist;
        expect(cy.get('#signup-button').should('be.disabled'));
    });

});