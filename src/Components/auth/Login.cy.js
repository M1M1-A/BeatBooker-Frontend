import React from 'react';
import Login from '../auth/Login'; 

describe('Login Component', () => {
  beforeEach(() => {
    cy.mount(<Login />); 
  });

  it('renders the login form', () => {
      cy.get('[data-testid="username"]').should('be.visible')
      cy.get('[data-testid="password"]').should('be.visible')
  }); 

  it("successfully logs in an existing user", () => {
      cy.intercept('POST', '/login', (req) => {
      req.body = {
        username: "someone",
        password: "password"
      };
  
      expect(req.headers['content-type']).to.include('application/json');
  
      req.reply({ status: 200, body: "Login successful" });
    }).as("loginRequest");
  
    cy.get('[data-testid=username-input]').type("someone");
    cy.get('[data-testid=password-input]').type("password");
    cy.get('#login-button').click();
  
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.body).to.eq("Login successful");
    });
  });    
  
  it('displays an error message for incorrect username', () => {
      cy.intercept('POST', '/login', (req) => {
        req.reply({ status: 401, body: 'Login failed'});
      }).as('loginRequest');

      cy.get('[data-testid=username-input]').type('incorrect@example.com');
      cy.get('[data-testid=password-input]').type('password');
      cy.get('#login-button').click();

      cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.body).to.eq("Login failed");    
    });  
  })

  it('displays an error message for incorrect password', () => {
    cy.intercept('POST', '/login', (req) => {
      req.reply({ status: 401, body: 'Login failed'});
    }).as('loginRequest');

    cy.get('[data-testid=username-input]').type('someone');
    cy.get('[data-testid=password-input]').type('wrongpassword');
    cy.get('#login-button').click();

    cy.wait('@loginRequest').then((interception) => {
    expect(interception.response.body).to.eq("Login failed");    
  });  
})

});