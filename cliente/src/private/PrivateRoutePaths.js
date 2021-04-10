import UserAccount from './../component/userAccount/UserAccount';
import AddUser from './../component/addUser/AddUser';
import Transference from './../component/transference/Transference';
import AllTransferences from './../component/allTransferences/AllTransferences';
import ListAllUserMoves from './../component/allTransferences/ListAllUserMoves';
import ModifyMoney from './../component/modifyMoney/ModifyMoney';
import Sobregiro from './../component/sobregiro/Sobregiro';
import UpdateSobregiro from './../component/updateSobregiro/UpdateSobregiro';
import AllOperations from './../component/allTransferences/AllOperations';
import ConsultSobregiro from './../component/consultSobregiro/ConsultSobregiro';
import CrearSobregiro from './../component/crearSobregiro/CrearSobregiro';
import UserView from './../component/Views/UserView';
import AdminView from './../component/Views/AdminView';
import AuditorView from './../component/Views/AuditorView';

export const routes = [
  {
    path: "/MiBanco/admin",
    component: AdminView,
    roles: ['admin'],
  },
  {
    path: "/MiBanco/users/new",
    component: AddUser,
    roles: ['admin'],
  },
  {
    path: "/MiBanco/clients/modifyBalance",
    component: ModifyMoney,
    roles: ['admin'],
  },
  {
    path: "/MiBanco/clients/overdrafts/update/state",
    component: UpdateSobregiro,
    roles: ['admin'],
  },
  {
    path: "/MiBanco/clients/operations",
    component: ListAllUserMoves,
    roles: ['admin', 'auditor'],
  },
  {
    path: "/MiBanco/user",
    component: UserView,
    roles: ['cliente'],
  },
  {
    path: "/MiBanco/client/operations/transactions",
    component: AllTransferences,
    roles: ['cliente'],
  },
  {
    path: "/MiBanco/client/operations",
    component: AllOperations,
    roles: ['cliente'],
  },
  {
    path: "/MiBanco/client/summary/balance",
    component: UserAccount,
    roles: ['cliente'],
  },
  {
    path: "/MiBanco/client/overdrafts",
    component: Sobregiro,
    roles: ['cliente'],
  },
  {
    path: "/MiBanco/client/transference/new",
    component: Transference,
    roles: ['cliente'],
  },
  {
    path: "/MiBanco/auditor",
    component: AuditorView,
    roles: ['auditor']
  }
];
