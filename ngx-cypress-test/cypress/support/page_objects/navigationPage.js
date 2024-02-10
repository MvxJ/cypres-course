function openMenuByName(name) {
    cy.contains('a', name).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
            if (attr.includes('left')) {
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage {
    formLayotsPage() {
        openMenuByName('Forms');
        cy.contains('Form Layouts').click();
    }

    datepickerPage() {
        openMenuByName('Forms');
        cy.contains('Datepicker').click()
    }

    smartTablePage() {
        openMenuByName('Tables & Data');
        cy.contains('Smart Table').click()
    }

    tooltipPage() {
        openMenuByName('Modal & Overlay');
        cy.contains('Tooltip').click()
    }

    toastrPage() {
        openMenuByName('Modal & Overlay');
        cy.contains('Toastr').click();
    }
}

export const navigateTo = new NavigationPage()