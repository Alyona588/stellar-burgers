import order from '../fixtures/order.json';
describe('тестирование конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');

    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');

    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa093c'}]`).as('testBun');
    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa0943'}]`).as('testSauce');
    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa093e'}]`).as('testFilling');
  });

  describe('проверка добавления ингредиентов в конструктор', () => {
    it('добавление булки в конструктор', () => {
      cy.get('@testBun').find('button').click();
      cy.get('[data-cy="constructorBun"]')
        .find('span')
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('добавление соуса в конструктор', () => {
      cy.get('@testSauce').find('button').click();
      cy.get('[data-cy="constructorFilling"]')
        .find('span')
        .contains('Соус фирменный Space Sauce')
        .should('exist');
    });

    it('добавление ингредиента в конструктор', () => {
      cy.get('@testFilling').find('button').click();
      cy.get('[data-cy="constructorFilling"]')
        .find('span')
        .contains('Филе Люминесцентного тетраодонтимформа')
        .should('exist');
    });

    describe('Проверка работы модальных окон описаний ингредиентов', () => {
      beforeEach(() => {
        cy.get('@testBun').find('a').click();
        cy.get('[data-cy="modal"]').as('modal');
      });

      it('открытие модального окна', () => {
        cy.get('@modal').should('exist');
      });
      it('закрытие модального окна по крестику', () => {
        cy.get('@modal').should('exist');
        cy.get('[data-cy="close-modal"]').click();
        cy.get('@modal').should('not.exist');
      });
      it('закрытие модального окна при клике по оверлею', () => {
        cy.get('@modal').should('exist');
        cy.get('[data-cy="modal_overlay"]').click({ force: true });
        cy.get('@modal').should('not.exist');
      });
    });
    describe('тестирование работы с заказом', () => {
      beforeEach(() => {
        cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as('getUser');
        cy.wait('@getUser');
        cy.intercept('POST', 'api/orders', { fixture: 'order' }).as('getOrder');
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
          'getIngredients'
        );
      });
      it('отправка заказа', () => {
        cy.get('@testBun').find('button').click();
        cy.get('@testFilling').find('button').click();

        cy.get('[data-cy="orderButton"]').should('be.enabled').click();
        cy.get('[data-cy="modal"]').as('modal');
        cy.wait('@getOrder');

        cy.get('@modal').should('exist');

        cy.get('@modal').find('h2').contains(order.order.number);
        cy.get('@modal').find('button').click();
        cy.get('@modal').should('not.exist');
        cy.get('[data-cy="orderButton"]').should('be.disabled');
      });
      afterEach(() => {
        cy.clearCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
    });
  });
});
