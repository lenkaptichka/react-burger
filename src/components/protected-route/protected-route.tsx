import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useSelector } from 'react-redux';
import { FC, ReactElement } from 'react';

const ProtectedRoute: FC<RouteProps & {children: ReactElement}> = ({ children, ...rest }) => {
  // TODO Исправить в следующем спринте
  // @ts-expect-error
  const userIsAuthorized = useSelector(state => state.userInformation.userIsAuthorized) as boolean;
  // @ts-expect-error
  const isAuthChecked = useSelector(state => state.userInformation.isAuthChecked);
  const userData = useSelector(state => state.userInformation.userData);

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