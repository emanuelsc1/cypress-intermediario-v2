// Cypress.Commands.add('login', (
//   user = Cypress.env('user_name'),
//   password = Cypress.env('user_password'),
// ) => {
//   const login = () => {
//     cy.visit('/users/sign_in')

//     cy.get("[data-qa-selector='login_field']").type(user)
//     cy.get("[data-qa-selector='password_field']").type(password, { log: false })
//     cy.get("[data-qa-selector='sign_in_button']").click()
//   }

//   login()
// })

// Novo método de login, com cache
// Cypress.Commands.add('login', (
//   user = Cypress.env('user_name'),
//   password = Cypress.env('user_password'),
//   { cacheSession = true } = {},
// ) => {
//   const login = () => {
//     cy.visit('/users/sign_in')

//     cy.get("[data-qa-selector='login_field']").type(user)
//     cy.get("[data-qa-selector='password_field']").type(password, { log: false })
//     cy.get("[data-qa-selector='sign_in_button']").click()
//   }

//   const options = {
//     cacheAcrossSpecs: true,
//   }

//   if (cacheSession) {
//     cy.session(user, login, options)
//     //Salva a aseção do usuário; ou seja, armazena os dados de login (user, password), sem chamar a função de login
//     // Utiliado para otimizar o tempo dos testes
//   } else {
//     login()
//     // Executa a função de login
//   }
// })

Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},  // Armazena os dados de login em cache
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    // O 'log: false' impede que a senha seja exibida no log
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  // Verifica se a página atual é diferente da página de login, significando que o usuário está autenticado
  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true, // Mantém os dados de login do usuário em cache
    validate, // Verificca se a seção ainda é válida
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})

Cypress.Commands.add('logout', () => {
  cy.get('.qa-user-avatar').click()
  cy.contains('Sign out').click()
})

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')

  cy.get('#project_name').type(project.name)
  cy.get('#project_description').type(project.description)
  cy.get('.qa-initialize-with-readme-checkbox').check()
  cy.contains('Create project').click()
})

Cypress.Commands.add('gui_createIssue', issue => {
  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

  cy.get('.qa-issuable-form-title').type(issue.title)
  cy.get('.qa-issuable-form-description').type(issue.description)
  cy.contains('Submit issue').click()
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('.qa-edit-link-labels').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
  cy.get('.block.milestone .edit-link').click()
  cy.contains(milestone.title).click()
})

  