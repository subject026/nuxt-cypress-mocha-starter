const logger = (violations) => {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )

  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  )

  cy.task('table', violationData)
}

context('Whaaa', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should something?', () => {
    cy.get('[data-cy="icon-button"]').should('have.text', 'fake@email.com')
    cy.checkA11y(
      null,
      {
        rules: {
          'color-contrast': { enabled: false },
        },
      },
      logger
    )
  })
})
