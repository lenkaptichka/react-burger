import { INGREDIENT_API_URL } from "../constants/constants";
import { fetchWithRefresh } from "../services/actions/token";
import { getCookie } from "./cookie";
import { TServerResponse, IIngredient, IEditUserDataFormState, IUserData } from "./types";

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

type TUserResponse = TServerResponse<{
  user: IUserData;
}>

export const orderApi = (ingredients: Array<string>): Promise<TSendOrderResponse> => {
  console.log('orderBurger')
  return fetchWithRefresh<TSendOrderResponse>(`${INGREDIENT_API_URL}/orders`, {
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

export const getUserApi = (): Promise<TUserResponse> => {
  console.log('getUserApi')
  return fetchWithRefresh<TUserResponse>(`${INGREDIENT_API_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
  .then((data) => {
    console.log({data})
    if (data?.success) {
      return data;
    } else {
      // console.log('error', Promise.reject(data))
      return Promise.reject(data)
    }
  })
}

export const updateUserApi = (form: IEditUserDataFormState): Promise<TUserResponse> => {
  console.log('updateUserApi')
  return fetchWithRefresh<TUserResponse>(`${INGREDIENT_API_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(form)
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