describe('Test with backend', () => {
  beforeEach('Login to App', () => {
    cy.intercept({method: 'GET', path: 'tags'}, {fixture: 'tags.json'})
    cy.loginToApplication()
  })
  
  it('Verify correct request and response', () => {
    cy.intercept('POST', Cypress.env('apiUrl') + '/articles/').as('postArticles')

    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').type("First Article")
    cy.get('[formcontrolname="description"]').type("Description")
    cy.get('[formcontrolname="body"]').type("Example content")
    cy.contains('Publish Article').click()

    cy.wait('@postArticles').then(xhr => {
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.request.body.article.body).to.equal('Example content')
      expect(xhr.response.body.article.description).to.equal('Description')
    })
  })

  it('verify popular tags are displayed', () => {
    cy.get('.tag-list')
      .should('contain', 'cypress')
      .and('contain', 'automation')
      .and('contain', 'testing')
  })

  it('verify global feed likes count', {retries: 0}, () => {
    cy.intercept("GET", Cypress.env('apiUrl') + '/articles/feed*', {"articles":[],"articlesCount":0})
    cy.intercept("GET", Cypress.env('apiUrl') + "/api/articles*", {fixture: 'articles.json'})
    cy.contains("Global Feed").click()
    cy.get('app-article-list button').then(heartList => {
      expect(heartList[0]).to.contain('20')
      expect(heartList[1]).to.contain('13')
    })

    cy.fixture('articles').then(file => {
      const articleSlug = file.articles[1].slug
      file.articles[1].favoritesCount += 1
      cy.intercept("POST", Cypress.env('apiUrl') +`/api/articles/${articleSlug}/favorite`, file)
    })

    cy.get('app-article-list button').eq(1).click().should('contain', '14')
  })

  // it('intercepting and modyfing request and response', () => {
  //   // cy.intercept('POST', '**/articles/', (request) => {
  //   //   request.body.article.description = "Sample description of  article"
  //   // }).as('postArticles')

  //   cy.intercept('POST', '**/articles/', (request) => {
  //     request.reply(response => {
  //       expect(response.body.article.description).to.equal("Description")
  //       response.body.article.description = "Descritpion 2"
  //     })
  //   }).as('postArticles')

  //   cy.contains('New Article').click()
  //   cy.get('[formcontrolname="title"]').type("First Article")
  //   cy.get('[formcontrolname="description"]').type("Description")
  //   cy.get('[formcontrolname="body"]').type("Example content")
  //   cy.contains('Publish Article').click()

  //   cy.wait('@postArticles').then(xhr => {
  //     expect(xhr.response.statusCode).to.equal(201)
  //     expect(xhr.request.body.article.body).to.equal('Example content')
  //     expect(xhr.response.body.article.description).to.equal('Description 2')
  //   })
  // })

  it('delete a new article in global article feed', () => {
    const bodyRequest = {
      "article": {
        "tagList": [],
        "title": "Request from API",
        "description": "Sample request from api",
        "body": "Sample body of post"
      }
    }

    cy.get('@token').then(token => {
      cy.request({
        url: Cypress.env('apiUrl') + "/articles",
        headers: {
          'Authorization': `Token ${token}`
        },
        method: 'POST',
        body: bodyRequest
      }).then(response => {
        expect(response.status).to.equal(201)
      })

      cy.contains('Global Feed').click().then(() => {
        cy.wait(500)
        cy.get('.article-preview').first().click()
        cy.get('.article-actions').contains('Delete Article').click()

        cy.request({
          url: Cypress.env('apiUrl') + "/articles?limit=10&offset=0",
          headers: {
            'Authorization': `Token ${token}`
          },
          method: 'GET',
        }).its('body').then(body => {
          expect(body.articles[0].title).not.to.equal("Request from API")
        })
      })
    })
  })
})