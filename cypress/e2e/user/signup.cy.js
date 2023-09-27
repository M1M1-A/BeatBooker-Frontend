/// <reference types="cypress" />

const user1 = {
  username: 'testuser1',
  password: 'testpassword',
    email: 'testuser1@test.com',
    firstname: 'test',
    lastname: 'user1',
}


describe('user signup', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signup')
    }
    )
    it('signs up a user', () => {
        cy.get('[data-testid=name-input]').type(user1.firstname)
        cy.get('[data-testid=lastname-input]').type(user1.lastname)
        cy.get('[data-testid=firstname-input]').type(user1.firstname)
        cy.get('[data-testid=email-input]').type(user1.email)
        cy.get('[data-testid=password-input]').type(user1.password)
        cy.get('[data-testid=confirm_password-input]').type(user1.password)
        cy.contains('Submit').click()
        cy.url().should('include', '/login')

    })
})



