import { type } from '@testing-library/user-event/dist/types/utility'

describe('Blog App', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost/3001/api/testing/reset')
    const user = {
      name: 'Evan Kardamitsis',
      username: 'evanv',
      password: 'test'
    }
    cy.request('POST', 'http://localhost/api/users', user)
    cy.visit('http://localhost/3000')
  })

  if('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

    describe('Login', function() {
      it('succeeds with correct credentials', function() {
        cy.contains('login')
          .click()
        cy.get('#username')
          .type('evanv')
        cy.get('#password')
          .type('test')
        cy.get('#login-button')
          .click()
        cy.contains('Evan Kardamitsis logged in')
      })

      it('login fails with wrong password', function() {
        cy.contains('login')
          .click()
        cy.get('#username')
          .type('evanv')
        cy.get('#password')
          .type('wrongpassword')
        cy.get('#login-button')
          .click()

        cy.get('#error')
          .should('contain', 'Wrong credentials')
          .and('have.css', 'color', 'rgb(255, 0, 0)')

        cy.get('html').should('not.contain','Evan Kardamitsis logged in' )
      })
    })

  describe('when logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'evank', password: 'test' })
    })

    it('a new blog can be added', function() {
      cy.contains('Add new blog')
        .click()
      cy.get('#title')
        .type('End to end testing with Cypress')
      cy.get('#author')
        .type('Cypress Documentation')
      cy.get('#url')
        .type('https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#The-Cypress-Command-Queue')
      cy.contains('add')
        .click()

      cy.contains('End to end testing with Cypress - Cypress Documentation')
    })

    it('user can like a blog', function() {
      cy.contains('Add new blog')
        .click()
      cy.get('#title')
        .type('End to end testing with Cypress')
      cy.get('#author')
        .type('Cypress Documentation')
      cy.get('#url')
        .type('https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#The-Cypress-Command-Queue')
      cy.contains('add')
        .click()

      cy.contains('End to end testing with Cypress - Cypress Documentation')
        .click()
      cy.contains('view')
        .click()
      cy.contains('0')
      cy.get('#like-button')
        .click()
      cy.contains('1')
    })

    it('user who created a blog can delete it', function() {
      cy.contains('Add new blog')
        .click()
      cy.get('#title')
        .type('End to end testing with Cypress')
      cy.get('#author')
        .type('Cypress Documentation')
      cy.get('#url')
        .type('https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#The-Cypress-Command-Queue')
      cy.contains('add')
        .click()

      cy.contains('End to end testing with Cypress - Cypress Documentation')
        .click()
      cy.contains('view')
        .click()
      cy.get('#remove')
        .click()

      cy.get('html').should('not.contain', 'End to end testing with Cypress - Cypress Documentation' )
    })
  })

  describe('Blogs ordered by the number of likes', function() {
    beforeEach(function() {
      cy.login({ username: 'evank', password: 'test' })
      cy.createBlog({ author: 'Johnny Dee', title: 'test blog', url:'https://google.com/testblog' })
      cy.createBlog({ author: 'Johnny Cee', title: 'test blog 2', url:'https://google.com/testblog2' })
      cy.createBlog({ author: 'Johnny Gee', title: 'test blog 3', url:'https://google.com/testblog3' })

      cy.contains('test blog').parent().as('blog1')
      cy.contains('test blog 2').parent().as('blog2')
      cy.contains('test blog 3').parent().as('blog3')
    })

    it('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('1')
      })
    })
  })
})