import './App.css';
import Login from './component/login/Login';
import Register from './component/register/Register';
import UserAccount from './component/userAcount/UserAcount';
import AddUser from './component/addUser/AddUser';
import Transference from './component/transference/Transference';
import AllTransferences from './component/allTransferences/AllTransferences';
import ModifyMoney from './component/modifyMoney/ModifyMoney';
import {Switch,Route} from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/register" component={Register} />
      <Route path="/summary" component={UserAccount}/>
      <Route path="/addUser" component={AddUser}/>
      <Route path="/newTransference" component={Transference}/>
      <Route path="/allTransference" component={AllTransferences}/>
      <Route path="/changeAmount" component={ModifyMoney}/>
    </Switch>
  );
}

export default App;
