describe('Тест конструктора', () => {
    beforeEach(() => {
        cy.viewport(1300, 800);
        cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'})
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.visit('http://localhost:4000');
    })
    it('Добавление ингредиентов',() => {
        cy.get('[data-cy="constructor"]')
            .should('have.length', 0)
        cy.get('[data-cy="main"]').contains('Добавить').click()
        cy.get('[data-cy="constructor"]')
            .should('have.length', 1)
    })
    it('Открытие и закрытие по клику на крестик модального окна ингредиента', () => {
        cy.get('[data-cy="bun"]').click()
        cy.get('[data-cy="modal"]')
        cy.get('[data-cy="closeBtn"]').click()
        cy.get('[data-cy="modal"]').should('not.exist')
    })
    it('Создание заказа', () => {
        cy.intercept('POST', 'api/orders', {fixture: 'order.json'})
        cy.get('[data-cy="bun"]').contains('Добавить').click()
        cy.get('.button').click()
        cy.get('[data-cy="modal"]').contains('1')
        cy.get('[data-cy="closeBtn"]').click()
        cy.get('[data-cy="modal"]').should('not.exist')
        cy.get('[data-cy="constructor"]')
            .should('not.have.length')
    })
})