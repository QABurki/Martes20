            describe('Enviar mensaje', () => {

                beforeEach(() => {
                    cy.visit('https://automationintesting.online/');
                });
                it('Validar que la info exista', () => {
                    cy.fixture('datos.json').then((datos) => {
                        datos.infoObligatoria.forEach((info) => {
                            cy.contains(info).should('be.visible');
                            cy.log('creado ok');                        })                    })                 
                });
                it('Validar Imagenes', () => {
                    cy.log('Chequeo de imagenes');
                    cy.get('.img-responsive.hotel-img').should('be.visible');
                    cy.get('.hotel-logoUrl').should('be.visible');
                    cy.log('Se cargo todo bien')
                } ) ;

                it('Validar descripción esperada', () => {
                    cy.log ('Chequeo de descripcion');
                    cy.fixture('datos.json').then((ppp)=> 
                    cy.contains(ppp.descEsperada).should('be.visible'))
                });
            
                it('Validar envío de form vacío', () => {
                    cy.log('Envío de form de contacto en blanco...');
                    cy.get('#submitContact').click();
                    cy.get('.alert').should('be.visible');
                    
                    cy.fixture('datos.json').then((errors) => {
                        errors.emptyFormErrors.forEach((errorMessage) => {
                            cy.completP(errorMessage);                        });                    });                });        
             
                it('Validar envío de form con data incorrecta', () => {
                    cy.intercept('POST','/message/').as('userIncorrecto')
                    cy.log('Set de datos incorrectos...');
                    cy.inputplaceH("Name","asd");
                    cy.inputplaceH("Email","asdasd");
                    cy.inputplaceH("Phone","ssasdasd");
                    cy.inputplaceH("Subject","asdasd");
                    cy.get('[data-testid="ContactDescription"]').type('asdasd');
                    cy.get('#submitContact').click();
                    cy.wait('@userIncorrecto').then(interception => {
                        expect(interception.response.statusCode).to.equal(400)
                        cy.log('user incorrecto check')         })
            
                    cy.get('.alert').should('be.visible');
                    cy.fixture('datos.json').then((errors) => {
                        errors.invalidFormErrors.forEach((errorMessage) => {
                            cy.completP(errorMessage);
                           
                        });
                    });
                });

                it('Validar envío de form con data correcta', () => {
                    cy.intercept('POST','/message/').as('userOk')
                    cy.log('Set de datos correctos...');
                    cy.inputplaceH("Name","juan perez");
                    cy.inputplaceH("Email","juan@gmail.com");
                    cy.inputplaceH("Phone","35123696457");
                    cy.inputplaceH("Subject","Reserva de habitación para fecha X");
                    cy.get('[data-testid="ContactDescription"]').type('loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo');
                    cy.get('#submitContact').click();
                    cy.wait('@userOk').then(interception => {
                        expect(interception.response.statusCode).to.equal(201)
                        cy.log('se creo todo bn')         })                });            
            });