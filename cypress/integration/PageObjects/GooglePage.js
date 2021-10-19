class GooglePage {
    visit(){
        cy.visit('https://www.google.pt/')
    }

    getCookiesAcceptBtn() {
        return cy.get(cookiesAcceptBtn)
    }

    getSearchBtn() {
        return cy.get(searchBtn)
    }

    getLuckyBtn() {
        return cy.get(luckyBtn)
    }

    getSearchInput() {
        return cy.get(searchInput)
    }

    getFirstResultFromSearch(){
        return cy.get(searchedResults).first()
    }
}

const cookiesAcceptBtn = 'div > button:nth-child(2) > div'
const searchBtn = 'form > div:nth-child(1) > div > div > center > input:nth-child(1)'
const luckyBtn = 'form > div:nth-child(1) > div > div > center > input:nth-child(2)'
const searchInput = 'form > div:nth-child(1) > div > div > div > div > input'
const searchedResults = 'div > div > div > div > a > h3'

export default GooglePage