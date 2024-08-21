Cypress.Commands.add('comandoDePrueba',(name,apellido) => {
    cy.get('#firstName').type(name)
    cy.get('#lastName').type(apellido)
} )
