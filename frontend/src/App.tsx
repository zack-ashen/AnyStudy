import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useHistory, useLocation, Route, Switch, Redirect } from 'react-router-dom'
import { GoogleLogin, useGoogleLogout } from 'react-google-login';

import { User } from './types';
import Landing from './pages/Landing/Landing';
import AuthContext from './contexts/auth';
import RequestContext from './contexts/request';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CourseSelection from './pages/CourseSelection/CourseSelection';
import GetStarted from './pages/GetStarted/GetStarted';
import { toast } from './components/ToastNotification/ToastManager'

import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [jwt, setJWT] = useState('');
  const [id, setId] = useState('');
  const [user, setUser] = useState<User>();
  const [refreshUser, setRefreshUser] = useState(() => () => { })
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
  const { signOut } = useGoogleLogout({ clientId });
  const history = useHistory();
  const { pathname } = useLocation();
  const [initPath, setInitPath] = useState('');

  useEffect(() => {
    setInitPath(pathname);
  }, [pathname])
  
  const withDefaults = (options?: RequestInit) => ({
    ...options,
    headers: {
      authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  })

  const logout = () => {
    signOut();
    localStorage.removeItem('userId')
    if (jwt) {
      setJWT('');
    }
    setLoggedIn(false);
    if (pathname !== '/') {
      history.push('/')
    }
  }
  
  const generateAuth = (login: boolean) => {
    return async function auth (googleData: any) {
      const { id_token: token } = googleData.getAuthResponse();
      const serverJWT = await fetch(
        '/api/auth',
        withDefaults({
          method: 'POST',
          body: JSON.stringify({
            token,
            clientId,
            login
          }),
        }),
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.err) {
            const errorMessage = json.err === 'User exists' ? 'This user already exists. Please sign in instead.' : 'This user could not be found. Please create an account.';
            toast.show({message: errorMessage})
          } else {
            return json.jwt
          }
        });
      
      if (serverJWT) {
        const decodedJWT: any = jwtDecode(serverJWT)
        setId(decodedJWT.id);
        localStorage.setItem('userId', decodedJWT.id)
        setJWT(serverJWT);
        const refresh = () => {
          fetch(`/api/user/${decodedJWT.id}`, {
            headers: {
              authorization: `Bearer ${serverJWT}`,
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setUser({id: data._id, email: data.email, name: data.name, userDetails: data.userDetails})
            });
        };
        refresh();
        setRefreshUser(() => refresh);
        setLoggedIn(true);
        if (initPath === '/') {
          history.push(login ? '/course-selection' : '/get-started')
        } else {
          history.push(initPath);
        }
      }
    }
  }
  
  const LoginButton = (
    <GoogleLogin
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          className="signInButton"
          disabled={renderProps.disabled}>
            Sign In
          </button>
      )}
      onSuccess={generateAuth(true)}
      onFailure={console.error}
      clientId={clientId}
      cookiePolicy="single_host_origin"
    />
  )

  const SignUpButton = (
    <GoogleLogin
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          className="getStartedButton"
          disabled={renderProps.disabled}>
            Get Started
          </button>
      )}
      onSuccess={generateAuth(false)}
      onFailure={console.error}
      clientId={clientId}
      cookiePolicy="single_host_origin"
    />
  )

  const AuthenticatedContent = () => (
    <AuthContext.Provider value={{ logout, id, user, refreshUser }}>
      <RequestContext.Provider value={{ withDefaults }}>
        <Switch>
          <Route exact path="/">
            <Landing loginButton={LoginButton} signUpButton={SignUpButton} />
          </Route>
          <PrivateRoute path="/course-selection" component={CourseSelection} />
          <PrivateRoute path="/get-started" component={GetStarted} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </RequestContext.Provider>
    </AuthContext.Provider>
  );
  
  const UnauthenticatedContent = () => (
    <Switch>
      <Route exact path="/">
        <Landing loginButton={LoginButton} signUpButton={SignUpButton} />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );

  return loggedIn ? <AuthenticatedContent /> : <UnauthenticatedContent /> 
}

export default App;
