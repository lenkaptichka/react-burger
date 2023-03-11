import { useEffect, useState, FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { ACCESS_TOKEN_LIFETIME } from '../../constants/constants';
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
import { getRefreshToken } from '../../services/actions/token';
import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';
import ProtectedRoute from '../protected-route/protected-route';

const App: FC = () => {
  const [timerId, setTimerId] = useState<ReturnType<typeof setInterval> | null>(null);

  const dispatch = useDispatch();

  // TODO Исправить в следующем спринте
  // @ts-expect-error
  const isAuthorized = useSelector(state => state.userInformation.userIsAuthorized) as boolean;

  useEffect(() => {
    // TODO Исправить в следующем спринте
    // @ts-expect-error
    dispatch(getIngredients());
    console.log({isAuthorized});
    if (getCookie('accessToken')) {
      // @ts-expect-error
      // getUser();
      dispatch(getUser());
    }
    // TODO Здесь не нужны зависимости, т.к. это действия при монтировании компонента
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (isAuthorized) {
  //     // @ts-expect-error
  //     const timer = setInterval(() => dispatch(getUser()), ACCESS_TOKEN_LIFETIME * 1000);
  //     // const timer = setInterval(() => dispatch(getUser()), 5000) ;

  //     // @ts-expect-error
  //     // const timer = setInterval(() => dispatch(getRefreshToken()), ACCESS_TOKEN_LIFETIME * 1000) ;
  //     setTimerId(timer);
  //   } else {
  //     if (timerId) {
  //       clearInterval(timerId);
  //       setTimerId(null);
  //     }
  //   }
  //   // TODO Здесь не нужнa зависимости dispatch, т.к. нет необходимости его отслеживать
  //   // eslint-disable-next-line
  // }, [isAuthorized]);

  return (
    <Router>
      <div className={`${styles.main} body`}>
        <AppHeader />
        <main className={styles.mainsection}>
        <Switch>
          <Route path='/' exact={true} >
            <Main />
          </Route>

          <Route path='/order-feed' exact={true}>
            <OrderFeed />
          </Route>

          <Route path='/login' exact={true}>
            <Login />
          </Route>

          <ProtectedRoute path='/profile' exact={true}>
            <Profile />
          </ProtectedRoute>

          <ProtectedRoute path='/profile/orders' exact={true}>
            <OrderHistory />
          </ProtectedRoute>

          <Route path='/register' exact={true}>
            <Register />
          </Route>

          <Route path='/forgot-password' exact={true}>
            <ForgotPassword />
          </Route>

          <Route path='/reset-password' exact={true}>
            <ResetPassword />
          </Route>

          <Route path='/ingredients/:id' exact={true}>
            <IngredientInformation />
          </Route>

          <Route>
            <NotFound />
          </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App;
