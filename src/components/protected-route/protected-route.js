import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, ...rest }) => {
  const userIsAuthorized = useSelector(state => state.userInformation.userIsAuthorized);

  return (
    <Route
      {...rest}
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