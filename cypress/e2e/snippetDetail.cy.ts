import {BACKEND_URL} from "../../src/utils/constants";
import {FakeSnippetStore} from "../../src/utils/mock/fakeSnippetStore";

describe('Add snippet tests', () => {
  beforeEach(() => {
    cy.loginToAuth0(
        Cypress.env('AUTH0_USERNAME'),
        Cypress.env('AUTH0_PASSWORD')
    )
    cy.intercept('GET', Cypress.env('MANAGER_URL')+"/manager/snippets/*").as("getSnippetById")
    cy.intercept('GET', Cypress.env('MANAGER_URL')+"/manager/snippets").as("getSnippets")

    cy.visit("/")

    cy.wait("@getSnippets")
    // cy.wait(2000) // TODO comment this line and uncomment 19 to wait for the real data
    cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').click();
  })

  it('Can share a snippet ', () => {
    cy.intercept('POST', Cypress.env('MANAGER_URL')+"/manager/share").as("shareSnippet")

    cy.get('[aria-label="Share"]').click();
    cy.get('#\\:rl\\:').click();
    cy.get('#\\:rl\\:-option-0').click();
    cy.get('.css-1yuhvjn > .MuiBox-root > .MuiButton-contained').click();

    cy.wait("@shareSnippet").its('response.statusCode').should('eq', 200);
  })

  it('Can run snippets', function() {
    cy.get('[data-testid="PlayArrowIcon"]').click();
    cy.get('.css-1hpabnv > .MuiBox-root > div > .npm__react-simple-code-editor__textarea').should("have.length.greaterThan",0);
  });

  it('Can format snippets', function() {
    cy.intercept('POST', Cypress.env('MANAGER_URL')+"/run/format").as("formatSnippet")

    cy.get('[data-testid="ReadMoreIcon"] > path').click();

    cy.wait("@formatSnippet").its('response.statusCode').should('eq', 200);
  });

  it('Can save snippets', function() {
    cy.intercept('PUT', Cypress.env('MANAGER_URL')+"/manager/snippets/*").as("updateSnippet")

    cy.get('.css-10egq61 > .MuiBox-root > div > .npm__react-simple-code-editor__textarea').click();
    cy.get('.css-10egq61 > .MuiBox-root > div > .npm__react-simple-code-editor__textarea').type("Some new line");
    cy.get('[data-testid="SaveIcon"] > path').click();

    cy.wait("@updateSnippet").its('response.statusCode').should('eq', 200);
  });

  it('Can delete snippets', function() {
    cy.intercept('DELETE', Cypress.env('MANAGER_URL')+"/manager/*").as("deleteSnippet")

    cy.get('[data-testid="DeleteIcon"] > path').click();
    cy.get('body > div.MuiModal-root.css-f42yq9-MuiModal-root > div.MuiBox-root.css-z3n8bp > div > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedError.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorError.MuiButton-root.MuiButton-contained.MuiButton-containedError.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorError.css-qx01tc-MuiButtonBase-root-MuiButton-root').click()

    cy.wait("@deleteSnippet").its('response.statusCode').should('eq', 200);
  });
})
