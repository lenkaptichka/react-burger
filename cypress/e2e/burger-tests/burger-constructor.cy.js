const testUrl = 'http://localhost:3000';

const bunName = 'Флюоресцентная булка R2-D3';
const newBunName = 'Краторная булка N-200i';
const sauceName = 'Соус с шипами Антарианского плоскоходца';
const mainName = 'Биокотлета из марсианской Магнолии';
const topPosition = '(верх)';
const bottomPosition = '(низ)';
const email = 'ponchik@email.ru';
const password = '1234';
const name = 'Пирожок';
const amount = '3022';
const orderNumber = '1000';

const ingredientSelector = '[class^="ingredient_ingredient"]';
const ingredientsSelector = '[class^="burger-ingredients_ingredients"]';
const headerTabSelector = '[class^="app-header_navigation-list-item"] > a > p';
const primaryColorStyle = 'text_color_primary';
const modalSelector = '[class^="modal_modal"]';
const counterSelector = '[class^="counter__num"]';
const constructorSelector = '[class^="constructor-element"]';
const currentTubStyle = 'tab_type_current';
const ingredientsTypeSelector = '[class^="burger-ingredients_type-name"]';
const burgerConstructorSelector = '[class^="burger-constructor_burger-constructor"]';
const ingredientNameSelector = '[class^="ingredient_name"]';
const closeIconSelector = '[data-cy=modal-close-icon]';
const tabSelector = '[class^="tab"]';

describe('first app opening', () => {
  before(() => {
    cy.visit(testUrl);
    cy.intercept('GET', 'ingredients', {fixture: 'ingredients.json'});
    cy.intercept('POST', 'login', {fixture: 'login.json'});
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('should open main page with burger constructor by default', () => {
    cy.contains('Конструктор');
    cy.contains('Лента заказов');
    cy.contains('Личный кабинет');
    cy.contains('Соберите бургер');
    cy.contains('Булки');
    cy.contains('Соусы');
    cy.contains('Начинки');
    cy.contains('Оформить заказ');
  });

  it('the burger constructor tab should be active and others inactive by default', () => {
    cy.get(headerTabSelector)
      .contains('Конструктор')
      .should('have.class', primaryColorStyle);

    cy.get(headerTabSelector)
      .contains('Лента заказов')
      .not(primaryColorStyle)

    cy.get(headerTabSelector)
      .contains('Личный кабинет')
      .not(primaryColorStyle)
  });

  it('default ingredients should not be selected', () => {
    cy.get(constructorSelector).should('not.exist')
  });

  it('by default order amount should be 0', () => {
    cy.get('[class^="burger-constructor_amount-text"]')
      .contains('0')
  });

  it('by default the checkout button should be disable', () => {
    cy.contains('Оформить заказ')
      .should('be.disabled')
  });
});

describe('the user should be able to log in', () => {
  beforeEach(() => { 
    cy.intercept('POST', 'login', {fixture: 'login.json'});
  });

  it('should work routing to the login page', () => {
    cy.get(headerTabSelector)
      .contains('Личный кабинет')
      .click();
    
    cy.contains('Вход');
    cy.contains('Войти');
  })

  it('should be logged in to the profile page', () => {
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.contains('Профиль');
    cy.contains('История заказов');
    cy.contains('Выход');

    cy.get('input[name="name"]')
      .should('have.attr', 'value', name);

    cy.get('input[name="email"]')
      .should('have.attr', 'value', email);

    cy.get('input[name="password"]')
      .should('have.attr', 'value', password);
  });

  after(() => {
    cy.get(headerTabSelector)
      .contains('Конструктор')
      .click();
  })
});

describe('checking the opening and closing of the modal window with ingredient details', () => {
  it('a modal window should open with ingredient details onclicking on the ingredient and contain all the necessary element', () => {
    cy.get('[class^="ingredient_link"]')
      .first()
      .click()

    cy.get(modalSelector).should('exist')

    cy.get(modalSelector).contains('Детали ингредиента')
    cy.get(modalSelector).contains('Калории,ккал')
    cy.get(modalSelector).contains('Белки, г')
    cy.get(modalSelector).contains('Жиры, г')
    cy.get(modalSelector).contains('Углеводы, г')

    cy.get(closeIconSelector).should('exist')

    cy.get('[class^="ingredient-details_value"]')
      .each(element => {
        expect(element).contains(/\d+/)
      })

    cy.get('[class^="ingredient-details_name"]')
      .should('exist')      
  });

  it('should close the modal window with ingredient details by clicking on the cross', () => {
    cy.get(closeIconSelector).click();
    
    cy.get(modalSelector).should('not.exist')
  });
})

describe('should switch tabs on click and scroll the list of ingredients', () => {
  it('should switch the main tab', () => {
    cy.get(tabSelector)
      .last()
      .as('mainTab')
      .click();

    cy.get(ingredientsTypeSelector)
      .contains('Начинки')
      .should('be.visible');

    cy.get('@mainTab').should('have.class', currentTubStyle);
  })

  it('should switch the sauce tab', () => {
    cy.get(tabSelector)
      .eq(1)
      .as('sauceTab')
      .click();

    cy.get(ingredientsTypeSelector)
      .contains('Соусы')
      .should('be.visible');

    cy.get('@sauceTab').should('have.class', currentTubStyle);
  })

  it('should switch the bun tab', () => {
    cy.get(tabSelector)
      .first()
      .as('bunTab')
      .click();

    cy.get(ingredientsTypeSelector)
      .contains('Булки')
      .should('be.visible');

    cy.get('@bunTab').should('have.class', currentTubStyle);
  })
});

describe('drag and drop selectable ingredients', () => {
  it('drag and drop should work correctly', () => {
    cy.get(ingredientsSelector)
      .contains(bunName)
      .trigger('dragstart');

    cy.get(burgerConstructorSelector).trigger('drop');

    cy.get(ingredientsSelector)
      .contains(sauceName)
      .trigger('dragstart');

    cy.get(burgerConstructorSelector).trigger('drop');

    cy.get(ingredientsSelector)
      .contains(mainName)
      .trigger('dragstart');

    cy.get(burgerConstructorSelector).trigger('drop');
  });

  it('ingredients should be in the constructor', () => {
    cy.get(constructorSelector).contains(`${bunName} ${topPosition}`);

    cy.get(constructorSelector).contains(`${bunName} ${bottomPosition}`);
    cy.get(constructorSelector).contains(sauceName);  
    cy.get(constructorSelector).contains(mainName);  
  });
});

describe('checking the quantity of selected ingredients', () => {
  it('should be the correct value of the selected ingredients', () => {
    cy.get(ingredientNameSelector)
      .contains(bunName)
      .parents(ingredientSelector)
      .find(counterSelector)
      .should('contain', 2);

    cy.get(ingredientNameSelector)
      .contains(sauceName)
      .parents(ingredientSelector)
      .find(counterSelector)
      .should('contain', 1);

    cy.get(ingredientNameSelector)
      .contains(mainName)
      .parents(ingredientSelector)
      .find(counterSelector)
      .should('contain', 1);
  })
});

describe('checking the removal of selected ingredients', () => {
  it('should  delete sauce or main', () => {
    cy.get(constructorSelector)
      .contains(sauceName)
      .parent()
      .find('[class^="constructor-element__action"]')
      .click();

    cy.get(ingredientSelector)
      .contains(ingredientNameSelector, sauceName)
      .parent()
      .find(counterSelector)
      .should('not.exist');

    cy.get(constructorSelector)
      .contains(sauceName)
      .should('not.exist');

    cy.get(ingredientsSelector)
      .contains(sauceName)
      .trigger('dragstart');

    cy.get(burgerConstructorSelector).trigger('drop');
  });
});

describe('bun replacement', () => {
  it('the selected bun should be replaced by dragging another one', () => {
    cy.get('[class^="burger-constructor_ingredients"]')
      .contains(bunName);

    cy.get(ingredientsSelector)
      .contains(newBunName)
      .trigger('dragstart');
    cy.get(burgerConstructorSelector).trigger('drop');

    cy.get(ingredientNameSelector)
      .contains(newBunName)
      .parents(ingredientSelector)
      .find(counterSelector)
      .should('contain', 2);

    cy.get(ingredientNameSelector)
      .contains(bunName)
      .parents(ingredientSelector)
      .find(counterSelector)
      .should('not.exist');

    cy.get(constructorSelector)
      .contains(bunName)
      .should('not.exist');

    cy.get(constructorSelector).contains(newBunName)
  })
})

describe('total cost check', () => {
  it('should be the correct value of the total cost', () => {
    cy.get('[class^="burger-constructor_amount"]')
      .contains(amount)
  })
});

describe('ordering', () => {
  beforeEach(() => { 
    cy.intercept('POST', 'orders', {fixture: 'order.json'});
  });

  it('a request with an order should be sent and a modal window with the order number should open', () => {
    cy.get('[class^="button"]')
      .contains('Оформить заказ')
      .click();

    cy.get(modalSelector).should('exist')
    cy.get(modalSelector).contains('идентификатор заказа');
    cy.get(modalSelector).contains(orderNumber);
    cy.get(modalSelector).contains('Ваш заказ начали готовить');
  })

  it('should close the modal window with order number by clicking on the cross', () => {
    cy.get(closeIconSelector).click();
    
    cy.get(modalSelector).should('not.exist')
  });
});
