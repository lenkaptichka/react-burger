import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useSelector } from '../../hooks/hooks';
import { FC, ReactElement } from 'react';

const ProtectedRoute: FC<RouteProps & {children: ReactElement}> = ({ children, ...rest }) => {

  const userIsAuthorized = useSelector(state => state.userInformation.userIsAuthorized);
  const isAuthChecked = useSelector(state => state.userInformation.isAuthChecked);
  const userData = useSelector(state => state.userInformation.userData);

  // console.log('Пр роут', {isAuthChecked, userData, token: getCookie('accessToken')});

  if (!isAuthChecked) {
    return <p>Подождите</p>
  }

  return (
    <Route {...rest}
      render={({ location }) =>
        userData && getCookie('accessToken') ? (
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
    />
  );
};

export default ProtectedRoute