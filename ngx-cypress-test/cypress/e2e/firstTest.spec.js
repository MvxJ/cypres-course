/// <reference type="cypress">
// context();

describe('First test suite', () => {
    it ('First Test', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //by tag name
        cy.get('input');
        //by id
        cy.get('#inputEmail1');
        //by class
        cy.get('.input-full-width')
        //by attribute name
        cy.get('[fullwidth]')
        //by attribute name and value
        cy.get('[placeholder="Email"]')
        //by entir class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        //by two attributes
        cy.get('[fullwidth][placeholder="Email"]')
        //by tag, attribute, id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')
        //by cypress test id
        cy.get('[data-cy="imputEmail1"]')
    });

    it('Second test', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')

        cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in').parents('form').find('nb-checkbox').click()
    })

    it('Save command results', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        //Using cypress alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')
        //Cypres then() method
        cy.contains('nb-card', 'Using the Grid').then(usingTheGrid => {
            cy.wrap(usingTheGrid).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGrid).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    it('Extract text values', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
        //2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address')

            cy.wrap(labelText).should('contain', 'Email address')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').then(text => {
            expect(text).to.equal('Email address')
        })

        //4
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label');
        })

        //5
        cy.get('#exampleInputEmail1').type('john.doe@example.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'john.doe@example.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'john.doe@example.com').then(fieldValue => {
            expect(fieldValue).to.equal('john.doe@example.com')
        })

    });

    //radio buttons
    it('radio buttons', ()=> {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force: true})
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
    });

    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        // cy.get('[type="checkbox"]').check({force: true})
        // cy.get('[type="checkbox"]').uncheck({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
    })

    it('date pickers', () => {
        function selectDate(dateToAdd) {
            let date = new Date()
            date.setDate(date.getDate() + dateToAdd)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDate()
                } else {
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                }
            })

            return dateToAssert;
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            const dateToAssert = selectDate(5);
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
        })
    })

    it('select colors', () => {
        cy.visit('/')

        //1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')

        //2
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const item = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.get('nav nb-select').should('contain', item)
                
                if (index < 3) {
                    cy.wrap(dropdown).click()
                }
            })
        })
    })

    it('tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '35')
        })

        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type("John")
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Doe")
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody').find('tr').eq(0).then(tableRow => {
            cy.wrap(tableRow).find('td').eq(2).should('contain', 'John')
            cy.wrap(tableRow).find('td').eq(3).should('contain', 'Doe')
        })

        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if (age == 200) {
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
    })

    it('tooltips', () => {
        cy.visit('/')
        cy.contains('Modal & Overlay').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it.only('dialg box', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        //2
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        //3
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => {return false})
    })
    // describe('suite section', () => {
    //     beforeEach('login', () => {

    //     });

    //     it('Test Zero', () => {

    //     });
    // });

    // it('First test', () => {

    // });

    // it('Second test', () => {

    // });
});