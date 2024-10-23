import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } } // Dessa forma, será possível ter o visual tanto dos testes em API, quanto dos testes no front, no mesmo teste

describe('Create Issue', options, () => {
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createProject(issue.project)
    // Dessa forma, para criar um issue, serão deletados os projetos anteriores via api (evitando o acúmulo de projetos), e criado um novo projeto, também via api, por ser mais rápido
  })

  it('successfully', () => {
    cy.gui_createIssue(issue)

    cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
  })
})