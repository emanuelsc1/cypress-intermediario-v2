import { faker } from '@faker-js/faker'

describe('Create Project', () => {
    // Antes de criar um novo projeto, ele irá deletar os anteriores
    beforeEach(() => cy.api_deleteProjects())

    // Teste para criação de projeto utilizando API
    it('successfully', () => {
        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        cy.api_createProject(project)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body.name).to.equal(project.name)
                expect(response.body.description).to.equal(project.description)
            })
    })
})
