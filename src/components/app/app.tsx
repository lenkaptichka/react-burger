import { useEffect, FC } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { useDispatch } from '../../hooks/hooks';
import { getIngredients } from '../../services/actions/burger-ingredients';
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
import { checkUserAuth } from '../../services/actions/user';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import { Location } from 'history'; 


const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const location = useLocation<{background?: Location}>();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, []);

  const closeModal = (): void => {
    history.goBack();
  };

  return (
    <div className={`${styles.main} body`}>
      <AppHeader />
      <main className={styles.mainsection}>

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
                closeModal={closeModal}
              >
                <FeedInformation />
              </Modal>
            </Route>
            <ProtectedRoute path='/profile/orders/:id' exact={true}>  
              <Modal
                closeModal={closeModal}
              >
                <MyOrderInformation/>
              </Modal>
            </ProtectedRoute>
          </>
        )
        }
      </main>
    </div>
  )
}

export default App;
