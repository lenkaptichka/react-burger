import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from '../../hooks/hooks';
import { FC, ReactElement } from 'react';
import styles from './protected-route.module.css';

const ProtectedRoute: FC<RouteProps & {children: ReactElement}> = ({ children, ...rest }) => {
  const isAuthChecked = useSelector(state => state.userInformation.isAuthChecked);
  const userData = useSelector(state => state.userInformation.userData);

  return (
    <>
      {isAuthChecked ?
      <Route {...rest}
        render={({ location }) =>
          userData? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
        }
      /> :
        <h3 className={`${styles.wait} text text_type_main-large`}>Подождите...</h3>
      }
    </>
  );
};

export default ProtectedRoute