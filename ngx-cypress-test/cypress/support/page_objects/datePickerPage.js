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
            selectDate(dateToAdd)
        } else {
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })

    return dateToAssert;
}

export class DatePickerPage {
    selectCommonDatePickerFromToday(dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            const dateToAssert = selectDate(dayFromToday);
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
        })
    }

    selectDatepickerWithRange(dayFromToday, dayFromTodayEnd)
    {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()
            const dateToAssert = selectDate(dayFromToday);
            const dateToAssertEnd = selectDate(dayFromTodayEnd);
            const finalDate = dateToAssert + " - " + dateToAssertEnd
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
        })
    }
}

export const onDatePickerPage = new DatePickerPage()
