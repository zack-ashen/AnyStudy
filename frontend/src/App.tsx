import { Switch, Route } from 'react-router';
import Landing from './pages/Landing/Landing';

import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Landing}></Route>
    </Switch>
  );
}

export default App;
