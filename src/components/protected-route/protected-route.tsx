import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useSelector } from 'react-redux';
import { FC, ReactElement } from 'react';

const ProtectedRoute: FC<RouteProps & {children: ReactElement}> = ({ children, ...rest }) => {
  // TODO Исправить в следующем спринте
  // @ts-expect-error
  const userIsAuthorized = useSelector(state => state.userInformation.userIsAuthorized) as boolean;

  return (
    <Route {...rest}
      render={({ location }) =>
        userIsAuthorized && getCookie('accessToken') ? (
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