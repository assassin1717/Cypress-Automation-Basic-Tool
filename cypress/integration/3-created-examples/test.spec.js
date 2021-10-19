/// <reference types='Cypress' />

import GooglePage from '../PageObjects/GooglePage'
import LegendasTVPage from '../PageObjects/LegendasTVPage'

describe.skip('Google normal search', () => {
    const googlePage = new GooglePage()

    before(() => {
        Cypress.Cookies.defaults({
            preserve: "CONSENT"
        })
        googlePage.visit()
    })

    after(() => {
        cy.clearCookie('CONSENT')
    })

    it('Verify Google url, title and accept cookies', () => {
        cy.url().should('include', 'google')
        cy.title().should('eq', 'Google')
        googlePage.getCookiesAcceptBtn().click()
    })

    it('Verify Google search buttons', () => {
        googlePage.getSearchBtn().should('have.value', 'Pesquisa Google')
        googlePage.getLuckyBtn().should('have.value', 'Sinto-me com sorte')
    })

    it('Perform a search in Google', () => {
        googlePage.getSearchInput().type('estyleoflife.pt{enter}')
    })

    it('Select the first option in the results', () => {
        googlePage.getFirstResultFromSearch().click()
    })

    it('Verify that reached the new website', () => {
        cy.title().should('eq', 'Home - EstyleOfLife - Seja bem-vindo à nossa página principal!')
        cy.url().should('include', 'estyleoflife')
    })
})

describe.skip('Checkbox verification', () => {
    const legendasPage = new LegendasTVPage()

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    })

    before(() => {
        legendasPage.visit()
    })

    it('Verify website url and title', () => {
        cy.url().should('include', 'legendastv')
        cy.title().should('eq', '.: LegendasTV :. - Legendas em Português - Estyle Of Life')
    })

    it('Go to Movies page', () => {
        legendasPage.getMoviesBtn().click()
    })

    it('Verify that the checkboxes are not checked and after that check them', () => {
        legendasPage.getFilterCheckBoxes().each(element => {
            cy.get(element).should('not.be.checked').check()
        })
    })

    it('Verify that the checkboxes are checked, after that uncheck them and verify', () => {
        legendasPage.getFilterCheckBoxes().each(element => {
            cy.get(element).should('be.checked').uncheck().should('not.be.checked')
        })
    })
})

describe.skip('Verify Google dropdowns', () => {
    const googlePage = new GooglePage()

    before(() => {
        Cypress.Cookies.defaults({
            preserve: "CONSENT"
        })
        googlePage.visit()
    })

    after(() => {
        cy.clearCookie('CONSENT')
    })

    it('Verify Google url, title and accept cookies', () => {
        cy.url().should('include', 'google')
        cy.title().should('eq', 'Google')
        googlePage.getCookiesAcceptBtn().click()
    })

    it('Go to dropdown page', () => {
        googlePage.getLuckyBtn().click()
    })

    it('Select country', () => {
        cy.get('#lang-chooser').select('zh-TW').should('have.value', 'zh-TW')
    })
})

describe.skip('Navigation test', () => {
    const googlePage = new GooglePage()

    before(() => {
        Cypress.Cookies.defaults({
            preserve: 'CONSENT'
        })
        googlePage.visit()
    })

    after(() => {
        cy.clearCookie('CONSENT')
    })

    it('Verify Google url, title and accept cookies', () => {
        cy.url().should('include', 'google')
        cy.title().should('eq', 'Google')
        googlePage.getCookiesAcceptBtn().click()
    })

    it('Perform a search in Google', () => {
        googlePage.getSearchInput().type('estyleoflife.pt{enter}')
    })

    it('Verify search url, title and go back', () => {
        cy.url().should('include', 'q=estyleoflife.pt')
        cy.title().should('eq', 'estyleoflife.pt - Pesquisa Google')
        cy.go('back')
    })

    it('Verify Google url, title and go forward', () => {
        cy.url().should('include', 'google')
        cy.title().should('eq', 'Google')
        cy.go('forward')
    })

    it('Verify search url and title', () => {
        cy.url().should('include', 'q=estyleoflife.pt')
        cy.title().should('eq', 'estyleoflife.pt - Pesquisa Google')
    })
})

describe('Fixtures use test', () => {
    let testData = {}
    const googlePage = new GooglePage()

    before(() => {
        Cypress.Cookies.defaults({
            preserve: "CONSENT"
        })
        cy.fixture('example').then(data => {
            testData = data
        })
        googlePage.visit()
    })

    after(() => {
        cy.clearCookie('CONSENT')
    })

    it('Verify Google url, title and accept cookies', () => {
        cy.url().should('include', 'google')
        cy.title().should('eq', 'Google')
        googlePage.getCookiesAcceptBtn().click()
    })

    it('Perform a search in Google, verify and go back', () => {
        testData.searches.forEach(key => {
            googlePage.getSearchInput().type(`${key}{enter}`)
            cy.url().should('include', `q=${key.replaceAll(' ', '+')}`)
            cy.title().should('eq', `${key} - Pesquisa Google`)
            cy.go('back')
        })
    })
})