
const axios = require('axios');
const FormData = require('form-data');
const express = require('express');
const {
  ApolloServer,
  gql,
  AuthenticationError,
} = require('apollo-server-express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const validator = require('validator');

const urlBack = 'https://immense-reef-34047.herokuapp.com/MiBanco';

const SECRET_KEY = 'secret!'

const app = express()

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true
}

const resolvers = {
  Query: {
    todos: (root, args) => {
      return todos.filter(todo => todo.user === id)
    }
  }
};

const context = ({ req }) => {
  const tokenExp = req.cookies['jwt'] || ''
  try {
    return { usuario, rol, cuenta, token } = jwt.verify(tokenExp, SECRET_KEY)
  } catch (e) {
    throw new AuthenticationError(
      'Authentication token is invalid, please log in',
    )
  }
};

const typeDefs = gql`
type User {
  id: ID!
  email: String!
  name: String!
  password: String!
}

type Todo {
  id: ID!
  user: Int!
  name: String!
}

type Query {
  todos: [Todo]
}
`

const server = new ApolloServer({ typeDefs, resolvers, context,  cors: false });

const asyncMiddleware = fn =>
(req, res, next) => {
  Promise.resolve(fn(req, res, next))
  .catch(next);
};


app.use(cors(corsOptions))
app.use(cookieParser())
server.applyMiddleware({ app, cors: false })
app.use(express.urlencoded({extended: true}))

/*
Función para obtener la cabecera con el token del back (para poder hacer peticiones)

@expToken Token de express
@return el formato del token de autenticación para la cabacera si el token de express existe; null en caso contrario
*/
const headerConfig = ( expToken ) => {

  try{
    const { token } = jwt.verify(expToken, SECRET_KEY)

    return `Bearer ${token}` ;
  }

  catch(e){
    return null;
  }
}

/*
Función para obtener el nombre de usuario guardado en el expToken

@expToken Token de express
@return El nombre de usuario si el token existe; null en caso contrario
*/
const getUsuario = ( expToken ) => {

  try{
    const { usuario } = jwt.verify(expToken, SECRET_KEY)

    return usuario;
  }

  catch(e){
    return null;
  }
}

/*
Función para obtener el rol del usuario almacenado en el token de express

@expToken Token de express
@return Retorna el rol del usuario, si el token de express existe; null en caso contrario
*/
const getRol = ( expToken ) => {

  try{
    const { rol } = jwt.verify(expToken, SECRET_KEY)

    return rol;
  }

  catch(e){
    return null;
  }
}

/*
Función para obtener el número de la cuenta del usuario almacenado en el token de express

@expToken Token de express
@return Retorna el número de cuenta del usuario, si el token de express existe; null en caso contrario
*/
const getCuenta = ( expToken ) => {

  try{
    const { cuenta } = jwt.verify(expToken, SECRET_KEY)

    return cuenta;
  }

  catch(e){
    return null;
  }
}

/*
Verifica que una cadena sólo tenga números
Parámetros: value -> Valor a verificar
*/
const validStringNumber = (value) => {
  return value.match(/^[0-9]+$/) != null;
}

/*
Verifica que el documento de identidad de un usuario sea válido
Parámetros: documento -> Número de documento del usuario
*/
const validDocument = (doc) => {
  return validStringNumber(doc) && doc.length >= 8 && doc.length <= 64;
}

/*
Verifica que el nombre de usuario de un usuario sea válido
Parámetros: user -> Número de usuario
*/
const validUsername = (user) => {
  if(user.length >= 6 && user.length <= 15) {
    return true
  }
  return false
}

/*
Verifica la seguridad de la contraseña de un usuario
Parámetros: passwd -> Contraseña del usuario
*/
const validPasswd = (passwd) => {

  if (validator.isStrongPassword(passwd, {
    maxLength: 64, minLength: 8, minLowercase: 1,
    minUppercase: 1, minNumbers: 1, minSymbols: 1
  })) {
    return true;
  } else {
    return false;
  }
}


/************************************************************************************************************************************/

/*
Petición para registrar un nuevo usuario en la aplicación
Parámetros body: documento -> Número de documento del usuario
                 usuario -> Nombre de usuario
                 passwd -> Contraseña del usuario
*/
app.post('/signup', asyncMiddleware(async (req, res, next) => {

  try{
    const { documento, usuario, passwd } = req.body;

    if(!validUsername(usuario) || !validPasswd(passwd) || !validDocument(documento)){
      res.status(404).send({
        success: false,
        message: `Datos inválidos`,
      })
      return
    }

    let exist = false;

    await axios.post(urlBack + '/signup',
    JSON.stringify({
      documento: documento,
      usuario: usuario,
      passwd: passwd
    }))
    .then(response => {

      if(response.data){
        exist=response.data;
      }
    })
    .catch(error => console.log(`Error: ${error}`));

    res.send({
      success: exist
    })
  }

  catch(e){
    console.log(e)
    res.status(404).send({
      success: false,
      message: `Datos inválidos`,
    })
  }
}));

/*
Petición para el manejo de inicio de sesión de un usuario
Parḿetros body: username -> Nombre de usuario
passwd -> Contraseña del usuario
*/
app.post('/login', asyncMiddleware(async (req, res, next) => {

  const { username, passwd } = req.body;

  let token; let rol; let cuenta;

  await axios.post(urlBack + '/login',
  JSON.stringify({
    usuario: username,
    passwd: passwd
  }))
  .then(response => {

    if(response.data){
      rol = response.data['role'].trim();
      token = response.data['token'];
      if(response.data['cuenta']) cuenta = response.data['cuenta'].trim();
    }
  })
  .catch(error => console.log(`Error: ${error}`));

  if (!token) {
    res.status(404).send({
      success: false,
      message: `Could not find account: ${username}`,
    })
    return
  }

  const clientUser = {
    usuario: username,
    rol: rol,
    cuenta: cuenta,
    token: token
  }

  const highUser = {
    usuario: username,
    rol: rol,
    token: token
  }
  // Se crea un token con JWT el nombre de usuario, su rol y su token con el servidor PHP
  const encriptedInfo = cuenta ? jwt.sign(clientUser,SECRET_KEY,) : jwt.sign(highUser, SECRET_KEY,);

  // Se guarda el token en una cookie (dura 10 minutos)
  res.cookie('jwt', encriptedInfo, {
    httpOnly: true,
    maxAge: 600000,
    //secure: true, //on HTTPS
    //domain: 'example.com', //set domain
  })

  res.send({
    success: rol
  })

}));

/*
Petición para verificar si un usuario puede acceder a x path según su rol y la información del token
Parámetros body: roles -> Roles que pueden acceder a x path
*/
app.post('/verifyUser', asyncMiddleware(async (req, res, next) => {

  try{
    const { roles } = req.body;

    let rolesList = roles.split(',');

    const  expToken  = req.cookies['jwt'] || null;

    // Datos originales del token (antes de encriptar)
    const { usuario, rol, token} = jwt.verify(expToken, SECRET_KEY)

    const rolInList = rolesList.includes(rol.trim())

    res.send({
      success: token && rolInList ? true : false
    })
  }

  catch(e){
    res.send({
      success:  false
    })
  }
}));

/*
Petición para la creación de un usuario
Parámetros body: documento -> Número de documento del nuevo usuario
                 nombre -> Nombre de la persona (si es un cliente no es necesario)
                 usuario -> Nombre de usuario de la aplicación
                 passwd -> Contraseña de loggeo en la aplicación
                 tipo -> Tipo de usuario
*/
app.post('/users/add', asyncMiddleware(async (req, res, next) => {

  const { documento, nombre, usuario, passwd, tipo } = req.body;

  if(!validUsername(usuario) || !validPasswd(passwd) || (documento && !validDocument(documento))) {
    res.status(404).send({
      success: false,
      message: `Datos inválidos`,
    })
    return
  }

  let ans = null
  const  expToken  = req.cookies['jwt'] || null;

  let header = headerConfig(expToken);

  if(header) {

    await axios.post(urlBack + '/user/new',
    JSON.stringify({
      tipo: tipo,
      documento: documento,
      nombre: nombre,
      usuario: usuario,
      passwd: passwd
    }),
    { headers: { Authorization: header } })
    .then(response => {
      ans = response.data
      console.log("usuario creado con éxito")
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  if(ans) {
    res.send({
      success: "Usuario creado",
    })
  }
  else {
    res.status(404).send({
      success: false,
      message: `Datos inválidos`,
    })
  }

}));

/*
Petición para modificar el saldo de un usuario cliente
Parámetros body: num_cuenta -> Número de la cuenta cuto saldo se desea modificar
                 saldo -> Nuevo  saldo de la cuenta

*/
app.post('/clients/modifyBalance', asyncMiddleware(async (req, res, next) => {

  const { num_cuenta, saldo } = req.body;

  let ans = null
  const  expToken  = req.cookies['jwt'] || null;

  let header = headerConfig(expToken);

  if(header) {

    await axios.post(urlBack + '/user/modifyBalance',
    JSON.stringify({
      num_cuenta: num_cuenta,
      saldo: saldo
    }),
    { headers: { Authorization: header } })
    .then(response => {
      ans = response.data
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  if(ans) {
    res.send({
      success: "Saldo modificado",
    })
  }
  else {
    res.status(404).send({
      success: false,
      message: `Datos inválidos`,
    })
  }

}));

/*
Petición para obtener todos los sobregiros que han sido creados
*/
app.post('/overdraft/getAll', asyncMiddleware(async (req, res, next) => {

  let ans = []
  const  expToken  = req.cookies['jwt'] || null;

  let usuario = getUsuario(expToken);
  let header = headerConfig(expToken);

  if(header && usuario) {

    await axios.post(urlBack + '/overdraft/getAll',
    JSON.stringify({
      usuario: usuario,
    }),
    { headers: { Authorization: header } })
    .then(response => {
      ans = response.data
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  if(ans) {
    res.send({
      success: ans,
    })
  }
  else {
    res.status(404).send({
      success: [],
      message: `Datos inválidos`,
    })
  }

}));

/*
Petición para actualizar el estado de un sobregiro
Parámetros body: id -> Id del sobregiro
                 estado -> Nuevo estado del sobregiro
                 porcentaje -> Porcentaje de aprobación (sólo es necesario si se aprueba el sobregiro)

*/
app.post('/clients/overdraft/update', asyncMiddleware(async (req, res, next) => {

  const { id, estado, porcentaje } = req.body;

  let ans = null
  const  expToken  = req.cookies['jwt'] || null;

  let usuario = getUsuario(expToken);
  let header = headerConfig(expToken);

  if(header && usuario) {

    await axios.post(urlBack + '/overdraft/update',
    JSON.stringify({
      id: id,
      estado: estado,
      porcentaje: porcentaje,
      usuario: usuario
    }),
    { headers: { Authorization: header } })
    .then(response => {
      ans = true
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  if(ans) {
    res.send({
      success: "Actualización exitosa",
    })
  }
  else {
    res.status(404).send({
      success: false,
      message: `Datos inválidos`,
    })
  }

}));

/*
Petición para obtener todas las transacciones de los usuarios del banco
*/
app.post('/clients/transactiones/getAll', asyncMiddleware(async (req, res, next) => {

  let ans = []
  const  expToken  = req.cookies['jwt'] || null;

  let usuario = getUsuario(expToken);
  let header = headerConfig(expToken);

  if(header && usuario) {

    await axios.post(urlBack + '/operations/getAll',
    JSON.stringify({
      usuario: usuario,
    }),
    { headers: { Authorization: header } })
    .then(response => {
      ans = response.data
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  if(ans) {
    res.send({
      success: ans,
    })
  }
  else {
    res.status(404).send({
      success: [],
      message: `Datos inválidos`,
    })
  }

}));

/*
Petición para obtener el número de cuenta bancaria de un usuario cliente
*/
app.post('/clients/user/getAccount', asyncMiddleware(async (req, res, next) => {

  let ans = null
  const  expToken  = req.cookies['jwt'] || null;

  let cuenta = getCuenta(expToken);

  if(cuenta) {
    ans = cuenta;
  }

  if(ans) {
    res.send({
      success: ans,
    })
  }
  else {
    res.status(404).send({
      success: false,
      message: `Datos inválidos`,
    })
  }

}));

/*
Petición para obtener todas las operaciones de un usuario (las transacciones que ha realizado tanto exitosas como rechazadas)
*/
app.post('/clients/user/operations/transactions', asyncMiddleware(async (req, res, next) => {

  let ans = []
  const  expToken  = req.cookies['jwt'] || null;

  let usuario = getUsuario(expToken);
  let header = headerConfig(expToken);

  if(header && usuario) {

    await axios.post(urlBack + '/user/operations/myTransactions',
    JSON.stringify({
      usuario: usuario,
    }),
    { headers: { Authorization: header } })
    .then(response => {
      ans = response.data
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  if(ans) {
    res.send({
      success: ans,
    })
  }
  else {
    res.status(404).send({
      success: [],
      message: `Datos inválidos`,
    })
  }

}));

/*
Petición para obtener todas las operaciones de un usuario (las transacciones que ha realizado tanto exitosas como rechazadas, y las que ha recibido)
*/
app.post('/clients/user/operations', asyncMiddleware(async (req, res, next) => {

  let ans = []
  const  expToken  = req.cookies['jwt'] || null;

  let usuario = getUsuario(expToken);
  let header = headerConfig(expToken);

  if(header && usuario) {

    await axios.post(urlBack + '/user/operations/getAll',
    JSON.stringify({
      usuario: usuario,
    }),
    { headers: { Authorization: header } })
    .then(response => {
      ans = response.data
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  if(ans) {
    res.send({
      success: ans,
    })
  }
  else {
    res.status(404).send({
      success: [],
      message: `Datos inválidos`,
    })
  }

}));

/*
Petición para obtener el saldo de un usuario
*/
app.post('/clients/user/balance', asyncMiddleware(async (req, res, next) => {

  let ans = null
  const  expToken  = req.cookies['jwt'] || null;

  let cuenta = getCuenta(expToken);
  let header = headerConfig(expToken);

  if(header && cuenta) {

    await axios.post(urlBack + '/user/getBalance',
    JSON.stringify({
      num_cuenta: cuenta,
    }),
    { headers: { Authorization: header } })
    .then(response => {
      ans = response.data
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  if(ans) {
    res.send({
      success: ans,
    })
  }
  else {
    res.status(404).send({
      success: ans,
      message: `Datos inválidos`,
    })
  }

}));

/*
Petición para obtener todos los sobregiros solicitados/realizados por una cuenta
*/
app.post('/clients/overdraft/getAll', asyncMiddleware(async (req, res, next) => {

  let ans = []
  const  expToken  = req.cookies['jwt'] || null;

  let cuenta = getCuenta(expToken);
  let header = headerConfig(expToken);

  if(header && cuenta) {

    await axios.post(urlBack + '/user/overdraft/consult',
    JSON.stringify({
      num_cuenta: cuenta,
    }),
    { headers: { Authorization: header } })
    .then(response => {
      ans = response.data
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  if(ans) {
    res.send({
      success: ans,
    })
  }
  else {
    res.status(404).send({
      success: [],
      message: `Datos inválidos`,
    })
  }

}));

/*
Petición para crear un sobregiro
Parámetros body: saldo -> Saldo solicitado en el sobregiro

*/
app.post('/clients/overdraft/new', asyncMiddleware(async (req, res, next) => {

  const { saldo } = req.body;

  let ans = null
  const  expToken  = req.cookies['jwt'] || null;

  let cuenta = getCuenta(expToken);
  let header = headerConfig(expToken);

  if(header && cuenta && saldo) {

    await axios.post(urlBack + '/user/overdraft/new',
    JSON.stringify({
      num_cuenta: cuenta,
      saldo: saldo
    }),
    { headers: { Authorization: header } })
    .then(response => {
      ans = response.data
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  if(ans) {
    res.send({
      success: ans,
    })
  }
  else {
    res.status(404).send({
      success: null,
      message: `Datos inválidos`,
    })
  }

}));

/*
Petición para crear una nueva transacción
Parámetros body: cuenta_destino -> Número de la cuenta destino
                 banco_destino -> Nombre del banco al que pertenece la cuenta destino
                 saldo -> Monto de la transacción

*/
app.post('/clients/transactions/new', asyncMiddleware(async (req, res, next) => {

  const { cuenta_destino, banco_destino, saldo } = req.body;

  let ans = null
  const  expToken  = req.cookies['jwt'] || null;

  let cuenta = getCuenta(expToken);
  let header = headerConfig(expToken);

  if(header && cuenta && saldo) {

    await axios.post(urlBack + '/user/transaction/new',
    JSON.stringify({
      origen: cuenta,
      destino: cuenta_destino,
      banco_destino: banco_destino,
      saldo: saldo
    }),
    { headers: { Authorization: header } })
    .then(response => {
      ans = response.data
    })
    .catch(error => console.log(`Error: ${error}`));
  }

  if(ans) {
    res.send({
      success: ans,
    })
  }
  else {
    res.status(404).send({
      success: null,
      message: `Datos inválidos`,
    })
  }

}));

app.listen(process.env.PORT || 3000, () =>
console.log(
  `🔥🔥🔥 GraphQL + Express auth tutorial listening on port 3000!`,
),
)
