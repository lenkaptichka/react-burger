import { useEffect, useState, FC } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { ACCESS_TOKEN_LIFETIME, ORDER_NUMBER_LENGTH } from '../../constants/constants';
import { USER_IS_AUTHORIZED } from '../../services/actions/user';
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
  IngredientInformation,
  FeedInformation,
  MyOrderInformation
} from '../../pages'
import { getUser, checkUserAuth } from '../../services/actions/user';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import { deleteIngredientDetails } from '../../services/actions/ingredient-details';
import { IMatchParams } from '../../utils/types';
import { Location } from 'history'; 


const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const location = useLocation<{background?: Location}>();
  const background = location.state && location.state.background;

  const feedTitle = useRouteMatch<IMatchParams>('/order-feed/:id')?.params?.id;
  const myOrdersTitle = useRouteMatch<IMatchParams>('/profile/orders/:id')?.params?.id;

  // const isAuthorized = useSelector(state => state.userInformation.userIsAuthorized);
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());

    // console.log({isAuthorized});
    // if (getCookie('accessToken')) {
      
    //   // dispatch({
    //   //   type: USER_IS_AUTHORIZED,
    //   //   isAuthorized: true
    //   // });
    //   // @ts-expect-error
    //   // getUser();
    //   dispatch(getUser());
    // }
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


  const closeModal = (): void => {
    // dispatch(deleteIngredientDetails());
    history.goBack();
  };

  // const formatedOrderNumber = useMemo(() => {
  //   return `#${String(order?.number).padStart(ORDER_NUMBER_LENGTH, '0')}`
  // }, [order.number]);

  return (
    // <Router>
      <div className={`${styles.main} body`}>
        <AppHeader />
        <main className={styles.mainsection}>

        {/* <Switch> */}
        <Switch location={background || location}>
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

            <ProtectedRoute path='/profile/orders/:id' exact={true}>
              <div className={styles['page-wrapper']}>
                <MyOrderInformation />
              </div>
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
            <div className={styles['page-wrapper']}>
              <IngredientInformation />
            </div>
          </Route>

          <Route path='/order-feed/:id' exact={true}>
            <div className={styles['page-wrapper']}>
              <FeedInformation />
            </div>
          </Route> 

          <Route>
            <NotFound />
          </Route>
          </Switch>

          {background && (
            <>
              <Route path='/ingredients/:id' exact={true}>
                <Modal title={'Детали ингредиента'} closeModal={closeModal}>
                  <IngredientInformation />
                </Modal>
              </Route>

              <Route path='/order-feed/:id' exact={true}>
                <Modal
                  title={`#${feedTitle?.padStart(ORDER_NUMBER_LENGTH, '0')}`}
                  closeModal={closeModal}
                >
                  <FeedInformation />
                </Modal>
              </Route>
              <ProtectedRoute path='/profile/orders/:id' exact={true}>  
                <Modal
                  title={`#${myOrdersTitle?.padStart(ORDER_NUMBER_LENGTH, '0')}`}
                  closeModal={closeModal}
                >
                  <MyOrderInformation />
                </Modal>
              </ProtectedRoute>
            </>
          )
          }
        </main>
      </div>
    // </Router>
  )
}

export default App;
