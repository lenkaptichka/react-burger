export const INGREDIENT_API_URL = 'https://norma.nomoreparties.space/api';
export const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';

export const BUNS_COUNT = 2;

// Время жизни accessToken 20 минут
export const ACCESS_TOKEN_LIFETIME = 1200;
// Время жизни refreshToken 30 дней
export const REFRESH_TOKEN_LIFETIME = 2592000;

export const FORGOT_PASSWORD_INITIAL_STATE = {email: ''};
export const LOGIN_INITIAL_STATE = {email: '', password: ''};
export const REGISTER_INITIAL_STATE = {email: '', password: '', name: ''};
export const RESET_PASSWORD_INITIAL_STATE = {password: '', token: ''};
export const PROFILE_EDITING_INITIAL_STATE = { name: '', email: '', password: '' };


export const ORDER_IMAGES_COUNT = 6;
export const ORDER_NUMBER_LENGTH = 6;
