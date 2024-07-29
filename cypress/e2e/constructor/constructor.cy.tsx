const testUrl = 'http://localhost:4000';

describe('Тест конструктора', () => {
    beforeEach(() => {
        cy.viewport(1300, 800);
        cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'})
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.visit(testUrl);
    })
    it('Добавление ингредиентов',() => {
        const constructor = cy.get('[data-cy="constructor"]')
        constructor.should('have.length', 0)
        cy.get('[data-cy="main"]').contains('Добавить').click()
        constructor.should('have.length', 1)
    })
    it('Открытие и закрытие по клику на крестик модального окна ингредиента', () => {
        cy.get('[data-cy="bun"]').click()
        const modal = cy.get('[data-cy="modal"]')
        cy.get('[data-cy="closeBtn"]').click()
        modal.should('not.exist')
    })
    it('Создание заказа', () => {
        const constructor = cy.get('[data-cy="constructor"]')
        cy.intercept('POST', 'api/orders', {fixture: 'order.json'})
        cy.get('[data-cy="bun"]').contains('Добавить').click()
        cy.get('.button').click()
        const modal = cy.get('[data-cy="modal"]')
        cy.get('[data-cy="closeBtn"]').click()
        modal.should('not.exist')
        constructor.should('not.have.length')
    })
})