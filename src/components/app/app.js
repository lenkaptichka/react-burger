import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { accessTokenLifetime } from '../../constants/constants';
// import Login from '../../pages/login';
// import Profile from '../../pages/profile';
import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  Profile,
  Main,
  NotFound,
  OrderFeed,
  OrderHistory,
  IngredientInformation
} from '../../pages'
// import Register from '../../pages/register';
// import ForgotPassword from '../../pages/forgot-password';
// import ResetPassword from '../../pages/reset-password';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { deleteIngredientDetails } from '../../services/actions/ingredient-details';

import { getRefreshToken } from '../../services/actions/token';
import { getUser, USER_IS_AUTHORIZED } from '../../services/actions/user';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from '../../utils/cookie';

function App() {
  const [timerId, setTimerId] = useState(null);

  const dispatch = useDispatch();
  const modalIngredient = useSelector(state => state.ingredientDetails.ingredient);
  const userData = useSelector(state => state.userInformation.userData);
  const isAuthorized = useSelector(state => state.userInformation.userIsAuthorized);
  const history = useHistory();

  useEffect(() => {
    dispatch(getIngredients());

    if (getCookie('accessToken')) {
      console.log(' куки есть');
      dispatch(getUser());
    } else {
      console.log(' куки net');
      // dispatch({
      //   type: USER_IS_AUTHORIZED,
      //   isAuthorized: false
      // });
    }
  }, []);

  useEffect(() => {
    console.log('isAuthorized', isAuthorized);
    // console.log('Обновление токена в юзэффект')
    // const timer = setInterval(() => dispatch(getRefreshToken()), 5000);
    // setTimerId(timer);

    // return () => {
    //   console.log('отмена обновления токена в юзэффект')
    //   clearInterval(timerId);
    //   setTimerId(null);

    // }

    if (isAuthorized) {
      console.log('Обновление токена в юзэффект')
      const timer = setInterval(() => dispatch(getRefreshToken()), accessTokenLifetime * 1000) ;
      setTimerId(timer);
    } else {
      console.log('отмена обновления токена в юзэффект')
      clearInterval(timerId);
      setTimerId(null);
    }

  }, [isAuthorized])



  // const closeModal = () => {
  //   dispatch(deleteIngredientDetails());
  //   // console.log('history', history);
  //   // event.stopPropagation();
  //   console.log('closeModal');
  //   // history.push("/");
  // }

  // if (!modalIngredient) {
  //   return history.push("/");
  // }

  return (
    <Router>
      <div className={`${styles.main} body`}>
        <AppHeader />
        {/* <DndProvider backend={HTML5Backend}> */}
        <main className={styles.mainsection}>
        <Switch>
          <Route path='/' exact={true} >
            <Main />
            {/* <BurgerIngredients />
            <BurgerConstructor /> */}
          </Route>
          <Route path='/order-feed' exact={true}>
            <OrderFeed />
          </Route>
          <Route path='/login' exact={true}>
            <Login />
          </Route>
          <Route path='/profile' exact={true}>
            <Profile />
          </Route>
          <Route path='/register' exact={true}>
            <Register />
          </Route>
          <Route path='/forgot-password' exact={true}>
            <ForgotPassword />
          </Route>
          <Route path='/reset-password' exact={true}>
            <ResetPassword />
          </Route>
          <Route path='/profile/orders' exact={true}>
            <OrderHistory />
          </Route>
          <Route path='/ingredients/:id' exact={true}>
            <IngredientInformation />
          </Route>
          <Route>
            <NotFound />
          </Route>
          {/* <Route path='/ingredients/:id' exact={true}>
            <Modal title={'Детали ингредиента'} closeModal={closeModal}>
              <IngredientDetails />
            </Modal>
          </Route> */}
          </Switch>
        </main>
        {/* </DndProvider> */}
      </div>
    </Router>

  )
}

export default App;
