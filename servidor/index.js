
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


/* Petición para el manejo de inicio de sesión de un usuario */
app.post('/login', asyncMiddleware(async (req, res, next) => {

  const { username, passwd } = req.body;

  var token; var rol;

  await axios.post('http://localhost:8001/MiBanco/login',
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


app.listen(3000, () =>
  console.log(
    `🔥🔥🔥 GraphQL + Express auth tutorial listening on port 3000!`,
  ),
)
