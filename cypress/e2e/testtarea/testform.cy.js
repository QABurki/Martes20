describe('test spec',{testlsolation:false}, ()  => {
    it('Visitar pagina',()=>{
        cy.visit('https://demoqa.com')
       
        cy.get('h5').contains('Elements').click()
        cy.get('span').contains('Forms').click()
        cy.get('span').contains('Practice Form').click()
        //cy.get('#firstName').type('panchito')
        //cy.get('#firstName').clear()
        //cy.get('#firstName').type('panghchito')

        //cy.get('#submit').click()
        //cy.get('#firstName:invalid').should('exist')
        cy.comandoDePrueba('juan','Perez')
    })

    


    });

    