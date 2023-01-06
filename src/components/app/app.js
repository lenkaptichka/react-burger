import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { accessTokenLifetime } from '../../constants/constants';
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

function App() {
  const [timerId, setTimerId] = useState(null);

  const dispatch = useDispatch();
  const isAuthorized = useSelector(state => state.userInformation.userIsAuthorized);

  useEffect(() => {
    dispatch(getIngredients());

    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      const timer = setInterval(() => dispatch(getRefreshToken()), accessTokenLifetime * 1000) ;
      setTimerId(timer);
    } else {
      clearInterval(timerId);
      setTimerId(null);
    }
  }, [isAuthorized]);

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
