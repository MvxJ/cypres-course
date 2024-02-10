import { navigateTo } from "../support/page_objects/navigationPage"
import { onFormLayotsPage } from "../support/page_objects/formLayoutsPage"
import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"
/// <reference type="cypress">
// context();
describe('Test with page object', () => {
    beforeEach('open application', () => {
        cy.visit('/')
    })

    it('verify navigation across the pages', () => {
        navigateTo.formLayotsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toastrPage()
    })

    it.only('should submit inline and basic form and select tommorow date in the calendar', () => {
        navigateTo.formLayotsPage()
        onFormLayotsPage.submitInlineFormWithNameAndEmail("Max", "max@example.com")
        onFormLayotsPage.submitBasicFormWithEmailAndPassword("max@example.com", "password")
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatePickerFromToday(1)
        onDatePickerPage.selectDatepickerWithRange(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstNameAndLastName("John", "Doe")
        onSmartTablePage.updateAgeByFirstName("John", 34)
        onSmartTablePage.deleteRowByIndex(0)
    })
})