import { Switch, Route } from 'react-router';
import Landing from './pages/Landing/Landing';
import AuthManagement from './pages/AuthManagement/AuthManagement';

import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/signin' render={(props) => (
        <AuthManagement signIn={true} /> )}/>
        <Route exact path='/signup' render={(props) => (
        <AuthManagement signIn={false} /> )}/>
    </Switch>
  );
}

export default App;
