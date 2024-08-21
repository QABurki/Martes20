describe('creacion de usuario',{testisolation: false},() =>{
it ('creacion de usuario ok', ()=> { 
    cy.intercept('POST','/api/users').as('userCreado')
    cy.visit('https://conduit.bondaracademy.com')
    cy.contains('Sign up').click()
    const numeroRandom = Math.floor(1000+ Math.random() * 9000)
    cy.get('[placeholder="Username"]').type(`test${numeroRandom}`)
    cy.get('[placeholder="Email"]').type(`test${numeroRandom}`)
    cy.get('[placeholder="Password"]').type('papito123')
    cy.get('.btn').click()
    cy.wait('@userCreado').then(interception => {

        expect(interception.response.statusCode).to.equal(201)    })
cy.log('felicidades flaco')
} )

it.only('Mal user',() => { 
    cy.intercept('POST','/api/users/login').as('userCreado')
    cy.visit('https://conduit.bondaracademy.com/login')
    cy.get('[placeholder="Email"]').type('cualquiera')
    cy.get('[placeholder="Password"]').type('c1233')
    cy.get('.btn').click()
    cy.wait('@userCreado').then(interception => {
        expect(interception.response.statusCode).to.equal(403)
        cy.log('Flaco ahi no')
    })
})






} )