import { INGREDIENT_API_URL } from "../constants/constants";
import { fetchWithRefresh } from "../services/actions/token";
import { getCookie } from "./cookie";
import { TServerResponse, IIngredient } from "./types";

interface IOwner {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
}

interface IOrder {
  createdAt: string;
  ingredients: Array<IIngredient>;
  name: string;
  number: number;
  owner: IOwner;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
}

type TSendOrderResponse = TServerResponse<{
  name: string;
  order: IOrder;
  success: boolean;
}>

export const orderBurgerApi = (ingredients: Array<string>) => {
  console.log('orderBurger')
  return fetchWithRefresh(`${INGREDIENT_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify({
      ingredients
    })
  })
  .then((data) => {
    if (data?.success) {
      return data;
    } else {
      // console.log('error', Promise.reject(data))
      return Promise.reject(data)
    }
  })
}