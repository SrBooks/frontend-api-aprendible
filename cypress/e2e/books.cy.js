describe('Books', () => {
  it('can list, show, create, edit and delete books', () => {
    
    //List books
    cy.visit('/')
      .get('[data-cy=link-to-books]').click()

    //Create books
    cy.get('[href="/libros/crear"]').click()
    .get('[data-cy="input-book-title"]')
      .type('New book from Cypress')
    .get('[data-cy="textarea-book-synopsis"]')
      .type('Synopsis from Cypress')
    .get('[data-cy=button-submit-book]')
      .click()
    .get('[data-cy=book-list]')
      .contains('New book from Cypress')

    //Show books
    cy.get('[data-cy^=link-to-visit-book-]')
      .last()
      .click()
      .get('h1')
      .should('contains.text', 'New book from Cypress')
      .get('[href="/libros"]').click()

    //Edit books
    cy.get('[data-cy^=link-to-edit-book-]')
    .last()
    .click()
    //Edit title
    .get('[data-cy="input-book-title"]')
      .clear()
      .type('Edit book from Cypress')
    //Edit synopsis
    .get('[data-cy="textarea-book-synopsis"]')
      .clear()
      .type('Edit Synopsis from Cypress')
    //Submit
    .get('[data-cy=button-submit-book]')
      .click()
    //Validation contains
    .get('[data-cy=book-list]')
      .contains('Edit book from Cypress')

    //Delete books
    cy.get('[data-cy^=link-to-delete-book-]')
    .last()
    .click()
    .last()
    .should('not.contain.text', 'Edit book from Cypress')

  })
})