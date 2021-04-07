import UserAccount from './../component/userAcount/UserAcount';
import AddUser from './../component/addUser/AddUser';
import Transference from './../component/transference/Transference';
import AllSuccesfullTransferences from './../component/allTransferences/AllTransferences';
import ListAllUserMoves from './../component/allTransferences/ListAllUserMoves';
import ModifyMoney from './../component/modifyMoney/ModifyMoney';
import Sobregiro from './../component/sobregiro/Sobregiro';
import UpdateSobregiro from './../component/updateSobregiro/UpdateSobregiro';
import AllTransferences from './../component/oficialAllTransference/OficialAllTransference';
import ConsultSobregiro from './../component/consultSobregiro/ConsultSobregiro';
import CrearSobregiro from './../component/crearSobregiro/CrearSobregiro';
import UserView from './../component/Views/UserView';
import AdminView from './../component/Views/AdminView';
import AuditorView from './../component/Views/AuditorView';

export const routes = [
  {
    path: "/summary",
    component: UserAccount,
    roles: ['cliente'],
  },
  {
    path: "/addUser",
    component: AddUser,
    roles: ['admin'],
  },
  {
    path: "/newTransference",
    component: Transference,
    roles: ['cliente'],
  },
  {
    path: "/allSuccesfulTransference",
    component: AllSuccesfullTransferences,
    roles: ['admin', 'auditor'],
  },
  {
    path: "/allTransference",
    component: AllTransferences,
    roles: ['admin', 'auditor'],
  },
  {
    path: "/changeAmount",
    component: ModifyMoney,
    roles: ['admin'],
  },
  {
    path: "/overdraft",
    component: Sobregiro,
    roles: ['cliente'],
  },
  {
    path: "/updateOverdraft",
    component: UpdateSobregiro,
    roles: ['admin'],
  },
  {
    path: "/consultOverdraft",
    component: ConsultSobregiro,
    roles: ['cliente'],
  },
  {
    path: "createOverdraft",
    component: CrearSobregiro,
    roles: ['cliente'],
  },
  {
    path: "/user",
    component: UserView,
    roles: ['cliente'],
  },
  {
    path: "/admin",
    component: AdminView,
    roles: ['admin'],
  },
  {
    path: "/auditor",
    component: AuditorView,
    roles: ['auditor']
  },
  {
    path: "/addUser/admin",
    component: AddUser,
    roles: ['admin'],
  },
  {
    path: "/usersOpers",
    component: ListAllUserMoves,
    roles: ['admin', 'auditor'],
  }
];
