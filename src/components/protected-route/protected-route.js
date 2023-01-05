import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookie';
import { getUser } from '../../services/actions/user';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, ...rest }) => {
  const [isUserLoaded, setUserLoaded] = useState(false);
  const userIsAuthorized = useSelector(state => state.userInformation.userIsAuthorized);
  console.log({userIsAuthorized})

  const init = () => {
    getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

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