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
  it('successfully signs up a new user', () => {
    cy.intercept('POST', '/signup', (req) => {
      req.body = {
        username: "someone",
        password: "password",
        confirm_password: "password",
        email: "someone@someone.com",
        first_name: "Someone",
        last_name: "Someone"
        };

        expect(req.headers['content-type']).to.include('application/json');

        req.reply({ status: 200, body: "Signup successful" });
        }).as("signupRequest");

        cy.get('[data-testid=username-input]').type("someone");
        cy.get('[data-testid=password-input]').type("password");
        cy.get('[data-testid=confirm_password-input]').type("password");
        cy.get('[data-testid=email-input]').type("someone@someone.com");
        cy.get('[data-testid=first_name-input]').type("Someone");
        cy.get('[data-testid=last_name-input]').type("Someone");
        cy.get('#signup-button').click();

        cy.wait('@signupRequest').then((interception) => {
        expect(interception.response.body).to.eq("Signup successful");
        }
        );
    });
    it('shows an error message and the signup button is disabled when the passwords do not match', () => {
        cy.get('[data-testid=username-input]').type("someone");
        cy.get('[data-testid=password-input]').type("password");
        cy.get('[data-testid=confirm_password-input]').type("notpassword");
        expect('[data-testid=password_error]').to.exist;
        expect(cy.get('#signup-button').should('be.disabled'));
    });

});