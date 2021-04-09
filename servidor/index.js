
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

const urlBack = 'http://localhost:8001/MiBanco';

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
  const token = req.cookies['jwt'] || ''
  try {
    return { username, rol, originalToken } = jwt.verify(token, SECRET_KEY)
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

const headerConfig = ( expToken ) => {

  try{
    const { token } = jwt.verify(expToken, SECRET_KEY)

    return `Bearer ${token}` ;
  }

  catch(e){
    return null;
  }
}

const getUsuario = ( expToken ) => {

  try{
    const { username } = jwt.verify(expToken, SECRET_KEY)

    return username;
  }

  catch(e){
    return null;
  }
}


/*
Petición para el manejo de inicio de sesión de un usuario
Parḿetros body: username -> Nombre de usuario
passwd -> Contraseña del usuario
*/
app.post('/login', asyncMiddleware(async (req, res, next) => {

  const { username, passwd } = req.body;

  var token; var rol;

  await axios.post(urlBack + '/login',
  JSON.stringify({
    usuario: username,
    passwd: passwd
  }))
  .then(response => {

    if(response.data){

      rol = response.data['role'];
      token = response.data['token'];

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

  // Se crea un token con JWT el nombre de usuario, su rol y su token con el servidor PHP
  const encriptedInfo = jwt.sign(
    {
      username: username,
      rol: rol,
      token: token
    },
    SECRET_KEY,
  );

  // Se guarda el token en una cookie
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
    const { username, rol, token} = jwt.verify(expToken, SECRET_KEY)

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
      console.log(response.data)
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

  let ans = null
  const  expToken  = req.cookies['jwt'] || null;

  let username = getUsuario(expToken);
  let header = headerConfig(expToken);

  if(header && username) {

    await axios.post(urlBack + '/overdraft/getAll',
    JSON.stringify({
      usuario: username,
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
      success: false,
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

  let username = getUsuario(expToken);
  let header = headerConfig(expToken);

  if(header && username) {

    await axios.post(urlBack + '/overdraft/update',
    JSON.stringify({
      id: id,
      estado: estado,
      porcentaje: porcentaje,
      usuario: username
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

app.listen(3000, () =>
console.log(
  `🔥🔥🔥 GraphQL + Express auth tutorial listening on port 3000!`,
),
)
