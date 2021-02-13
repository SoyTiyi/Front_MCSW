import './App.css';
import Login from './component/login/Login';
import Register from './component/register/Register';
import UserAccount from './component/userAcount/UserAcount';
import AddUser from './component/addUser/AddUser';
import Transference from './component/transference/Transference';
import AllSuccesfullTransferences from './component/allTransferences/AllTransferences';
import ModifyMoney from './component/modifyMoney/ModifyMoney';
import Sobregiro from './component/sobregiro/Sobregiro';
import UpdateSobregiro from './component/updateSobregiro/UpdateSobregiro';
import AllTransferences from './component/oficialAllTransference/OficialAllTransference';
import ConsultSobregiro from './component/consultSobregiro/ConsultSobregiro';
import CrearSobregiro from './component/crearSobregiro/CrearSobregiro';
import UserView from './component/Views/UserView';
import AdminView from './component/Views/AdminView';
import {Switch,Route} from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/register" component={Register} />
      <Route path="/summary" component={UserAccount}/>
      <Route path="/addUser" component={AddUser}/>
      <Route path="/newTransference" component={Transference}/>
      <Route path="/allSuccesfulTransference" component={AllSuccesfullTransferences}/>
      <Route path="/allTransference" component={AllTransferences}/>
      <Route path="/changeAmount" component={ModifyMoney}/>
      <Route path="/overdraft" component={Sobregiro}/>
      <Route path="/updateOverdraft" component={UpdateSobregiro}/>
      <Route path="/consultOverdraft" component={ConsultSobregiro}/>
      <Route path="/createOverdraft" component={CrearSobregiro}/>
      <Route path="/user" component={UserView}/>
      <Route path="/admin" component={AdminView}/>
    </Switch>
  );
}

export default App;
