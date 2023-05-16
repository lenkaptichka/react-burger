# Stellar-burger :rocket: :hamburger:

[Ссылка на итоговый проект](https://lenkaptichka.github.io/react-burger/)

## О проекте
Проект StellarBurger выполнен в рамках интенсива "React-разрабочик" от Яндекс.Практикум и представляет собой SPA-приложение, состоящее из нескольких страниц, в котром можно собрать космический бургер и оформить заказ. 
Приложениесвёрстано представляет собой десктопную версию.

## Технологии и инструменты
- приложение создано с помощью **create-react-app**;
- вёрстка выполнена по макету **Figma** с использованием готовых [UI-компонентов](https://github.com/yandex-praktikum/react-developer-burger-ui-components);
- фронтенд-часть написана на **React**;
- для типизации используется **TypeScript**;
- для управления состоянием данных в приложении используется **Redux** и **redux-thunk**;
- лента заказов реализована с помощью **WebSocket**;
- перетаскивание реализована при помощи библотеки **ReactDnD**;
- роутинг реализован при помощи библиотеки **React Router v5**;
- для unit-тестов используется **Jest**, а для e2e-тестирования **Cypress**.

## Функциональность
Приложение состоит из трёх вкладок:
### Вкладка "Конструктор"
Во вкладке конструктор находится список всех доступных ингредиентов.
Для навигации в списке можно использовать скролл или нажать на одну из вкладок (*Булки*, *Соусы* или *Начинки*). При клике на ингредиент будет открыто модальное окно, в котором содержится информация о его пищевой ценности. 
Чтобы добавить ингредиент в свой бургер, необходимо перетащить его в правую область. Порядок соусов и начинок в бургере можно так же изменять перетаскиванием или удалять нажатием на соответсвующий значок. Чтобы заменить булочку, нужно перетащить новую в конструктор бургера.
Когда бургер собран, для оформления заказа необходимо нажать кнопку *"Оформить заказ"*, после чего, если пользователь авторизован, появится окно с подробной информацией о заказе, или, если пользователь не авторизован, произойдёт переход на страницу авторизации.
### Вкладка "Лента заказов"
Во кладке "Лента заказов" отображается статистика бургерной, а также последние 50 заказов. При клике на заказ откроется модальное окно с подробной информацией о нём.
### Вкладка "Личный кабинет"
Если пользователь не авторизован, то при переходе на вкладку "Личный кабинет", ему будет предложено пройти авторизацию или, если пользователь новый, зарегистрироваться.
Если пользователь авторизован, во вкладке Личный кабинет будет отображено меню:
 - **Профиль** - содержит информацию о пользователе (имя, адрес электронной почты и пароль), которые можно изменить.
 - **История заказов** - лента с заказами пользователя. При клике на заказ так же доступна подробная информация о нём.
 - **Выход** - при нажатии будет произведён выход пользователя из системы.

## Запуск проекта
Сначала:
- склонируйте данный репозиторий;
- установите все необходимые зависимости командой `npm i`;
**Для запуска проекта:**
- запустите проект локально командой `npm start`, проект будет доступен по адресу [http://localhost:3000](http://localhost:3000).

**Для запуска unit-тестов:**
- выполните команду `npm test`.

**Для запуска e2e-тестов:**
- запустите проект локально;
- в новом терминале выполните команду `npm run cypress`;
- в открывшемся окне *Cypress* выберите *E2E Testing*, затем браузер (Chrome), нажмите *"Start E2E Testing in Chrome"*, поcле чего выберите *"burger-constructor"*.
