import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';
  import { AppDispatch, RootState } from '../utils/types';
  
  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  export const useDispatch = () => dispatchHook<AppDispatch>(); 