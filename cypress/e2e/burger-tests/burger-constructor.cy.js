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

describe('first app opening', () => {
  before(() => {
    cy.visit('http://localhost:3000');
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
    cy.get('[class^="app-header_navigation-list-item"] > a > p')
      .contains('Конструктор')
      .should('have.class', 'text_color_primary');

    cy.get('[class^="app-header_navigation-list-item"] > a > p')
      .contains('Лента заказов')
      .not('text_color_primary')

    cy.get('[class^="app-header_navigation-list-item"] > a > p')
      .contains('Личный кабинет')
      .not('text_color_primary')
  });

  it('default ingredients should not be selected', () => {
    cy.get('[class^="constructor-element"]')
      .should('not.exist')
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
    cy.get('[class^="app-header_navigation-list-item"]')
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
    cy.get('[class^="app-header_navigation-list-item"]')
      .contains('Конструктор')
      .click();
  })
});

describe('checking the opening and closing of the modal window with ingredient details', () => {
  it('a modal window should open with ingredient details onclicking on the ingredient and contain all the necessary element', () => {
    cy.get('[class^="ingredient_link"]')
      .first()
      .click()

    cy.get('[class^="modal_modal"]')
      .as('modal')
      .should('exist')

    cy.get('@modal').contains('Детали ингредиента')
    cy.get('@modal').contains('Калории,ккал')
    cy.get('@modal').contains('Белки, г')
    cy.get('@modal').contains('Жиры, г')
    cy.get('@modal').contains('Углеводы, г')

    cy.get('[data-cy=modal-close-icon]')
      .should('exist')

    cy.get('[class^="ingredient-details_value"]')
      .each(element => {
        expect(element).contains(/\d+/)
      })

    cy.get('[class^="ingredient-details_name"]')
      .should('exist')      
  });

  it('should close the modal window with ingredient details by clicking on the cross', () => {
    cy.get('[data-cy=modal-close-icon]')
      .click();
    
    cy.get('[class^="modal_modal"]')
      .should('not.exist')
  });
})

describe('should switch tabs on click and scroll the list of ingredients', () => {
  it('should switch the main tab', () => {
    cy.get('[class^="tab"]')
      .last()
      .as('mainTab')
      .click();

    cy.get('[class^="burger-ingredients_type-name"]')
      .contains('Начинки')
      .should('be.visible');

    cy.get('@mainTab').should('have.class', 'tab_type_current');
  })

  it('should switch the sauce tab', () => {
    cy.get('[class^="tab"]')
      .eq(1)
      .as('sauceTab')
      .click();

    cy.get('[class^="burger-ingredients_type-name"]')
      .contains('Соусы')
      .should('be.visible');

    cy.get('@sauceTab').should('have.class', 'tab_type_current');
  })

  it('should switch the bun tab', () => {
    cy.get('[class^="tab"]')
      .first()
      .as('bunTab')
      .click();

    cy.get('[class^="burger-ingredients_type-name"]')
      .contains('Булки')
      .should('be.visible');

    cy.get('@bunTab').should('have.class', 'tab_type_current');
  })
});

describe('drag and drop selectable ingredients', () => {
  it('drag and drop should work correctly', () => {
    cy.get('[class^="burger-ingredients_ingredients"]')
      .as('ingredients')
      .contains(bunName)
      .trigger('dragstart');

    cy.get('[class^="burger-constructor_burger-constructor"]')
      .as('constructor')
      .trigger('drop');

    cy.get('@ingredients')
      .contains(sauceName)
      .trigger('dragstart');

    cy.get('@constructor').trigger('drop');

    cy.get('@ingredients')
      .contains(mainName)
      .trigger('dragstart');

    cy.get('@constructor').trigger('drop');
  });

  it('ingredients should be in the constructor', () => {
    cy.get('[class^="constructor-element"]')
      .as('ingredient')
      .contains(`${bunName} ${topPosition}`);

    cy.get('@ingredient').contains(`${bunName} ${bottomPosition}`);
    cy.get('@ingredient').contains(sauceName);  
    cy.get('@ingredient').contains(mainName);  
  });
});

describe('checking the quantity of selected ingredients', () => {
  it('should be the correct value of the selected ingredients', () => {
    cy.get('[class^="ingredient_name"]')
      .as('ingredientName')

    cy.get('@ingredientName')
      .contains(bunName)
      .parents('[class^="ingredient_ingredient"]')
      .find('[class^="counter__num"]')
      .should('contain', 2);

    cy.get('@ingredientName')
      .contains(sauceName)
      .parents('[class^="ingredient_ingredient"]')
      .find('[class^="counter__num"]')
      .should('contain', 1);

    cy.get('@ingredientName')
      .contains(mainName)
      .parents('[class^="ingredient_ingredient"]')
      .find('[class^="counter__num"]')
      .should('contain', 1);
  })
});

describe('checking the removal of selected ingredients', () => {
  it('should  delete sauce or main', () => {
    cy.get('[class^="constructor-element"]')
      .as('constructor')
      .contains(sauceName)
      .parent()
      .find('[class^="constructor-element__action"]')
      .click();

    cy.get('[class^="ingredient_ingredient"]')
      .as('ingredient')
      .contains('[class^="ingredient_name"]', sauceName)
      .parent()
      .find('[class^="counter__num"]')
      .should('not.exist');

    cy.get('@constructor')
      .contains(sauceName)
      .should('not.exist');

    cy.get('[class^="burger-ingredients_ingredients"]')
      .contains(sauceName)
      .trigger('dragstart');

    cy.get('[class^="burger-constructor_burger-constructor"]')
      .trigger('drop');
  });
});

describe('bun replacement', () => {
  it('the selected bun should be replaced by dragging another one', () => {
    cy.get('[class^="ingredient_name"]')
      .as('ingredientName');
    cy.get('[class^="constructor-element"]')
      .as('constructorElement')

    cy.get('[class^="burger-constructor_ingredients"]')
      .contains(bunName);

    cy.get('[class^="burger-ingredients_ingredients"]')
      .contains(newBunName)
      .trigger('dragstart');
    cy.get('[class^="burger-constructor_burger-constructor"]')
      .trigger('drop');

    cy.get('@ingredientName')
      .contains(newBunName)
      .parents('[class^="ingredient_ingredient"]')
      .find('[class^="counter__num"]')
      .should('contain', 2);

    cy.get('@ingredientName')
      .contains(bunName)
      .parents('[class^="ingredient_ingredient"]')
      .find('[class^="counter__num"]')
      .should('not.exist');

    cy.get('@constructorElement')
      .contains(bunName)
      .should('not.exist');

    cy.get('@constructorElement')
      .contains(newBunName)
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

    cy.get('[class^="modal_modal"]')
      .as('modal')
      .should('exist')

    cy.get('@modal').contains('идентификатор заказа');
    cy.get('@modal').contains(orderNumber);
    cy.get('@modal').contains('Ваш заказ начали готовить');
  })

  it('should close the modal window with order number by clicking on the cross', () => {
    cy.get('[data-cy=modal-close-icon]')
      .click();
    
    cy.get('[class^="modal_modal"]')
      .should('not.exist')
  });
});
