export class SmartTablePage {
    updateAgeByFirstName(firstName, age) {
        cy.get('tbody').contains('tr', firstName).then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        })
    }

    addNewRecordWithFirstNameAndLastName(firstName, lastName) {
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody').find('tr').eq(0).then(tableRow => {
            cy.wrap(tableRow).find('td').eq(2).should('contain', firstName)
            cy.wrap(tableRow).find('td').eq(3).should('contain', lastName)
        })
    }

    deleteRowByIndex(index) {
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(index)).to.be.calledWith('Are you sure you want to delete?')
        })
    }
}

export const onSmartTablePage = new SmartTablePage()