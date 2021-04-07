import './App.css';
import Login from './component/login/Login';
import Register from './component/register/Register';
import {Switch,Route} from 'react-router-dom';
import PrivateRoute from './private/PrivateRoute';
import {routes} from './private/PrivateRoutePaths'


const protectedElements = routes.map((route, i) =>
  <PrivateRoute path={route.path} component={route.component} roles={route.roles} key={i} />
);

function App() {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/register" component={Register} />
      {protectedElements}
      <Route path="*" component={() => "404 NOT FOUND"} />
    </Switch>
  );
}

export default App;
