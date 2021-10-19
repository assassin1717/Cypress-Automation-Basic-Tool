class LegendasTVPage {
    visit() {
        cy.visit('http://www.legendastv.pt/')
    }

    getMoviesBtn() {
        return cy.get(moviesBtn)
    }

    getFilterCheckBoxes(){
        return cy.get(filterChecks)
    }
}

const moviesBtn = 'img[alt=Filmes]'
const filterChecks = 'input[type=checkbox]'

export default LegendasTVPage