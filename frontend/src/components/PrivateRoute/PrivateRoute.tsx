import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useContext } from 'react';

import { isLoggedIn } from '../../util';
import AuthContext from '../../contexts/auth'
import Nav from "../Nav/Nav"

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  return (
    <button className="logoutButton" onClick={logout}>
      Sign Out 
    </button>
  );
}

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute = ({component: Component, ...rest }: PrivateRouteProps) => {
  if (!Component) return null;
  const logoutButton = LogoutButton();
  return (
    <Route {...rest} render={props => (
      isLoggedIn() ?
      (<>
        <Nav authButton={logoutButton}/>
        <Component {...props} />
      </>)
        : <Redirect to="/" />
    )} />
  )
}

export default PrivateRoute;
