import React from 'react';
import {setHeaderOptions} from './RequestHeader';

const axios = require('axios').default;
//const URL = 'http://localhost:3000';
const URL = 'https://mibanco-back.herokuapp.com';

const getExpireUser = async (reqBody) => {

  let valid = false;
  //con el rol
  await fetch(URL+"/verifyUser", setHeaderOptions(reqBody))
  .then(response => response.json())
  .then(data => {
    valid = data.success;
  })
  return valid;
}

class AuthService extends React.Component{

  constructor(props) {
    super(props)
    this.state = null
  }

  login(username, password) {

    let reqBody = `username=${username}&passwd=${password}`

    return fetch(URL+"/login", setHeaderOptions(reqBody))
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          alert('User not found, please retry')
        }
        if (response.status === 401) {
          alert('Invalid credentials')

        }
      }
      return response
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        let rol = data.success.trim();
        return rol;
      }
    })
  }

  signup(usr){
    return axios.post(`${URL}/signup`, usr)
    .then(response => response.status)
    .catch(error => {
      if (error.response){
        alert('Bad credentials')
        console.info(error.response.status);
        console.info(error.response.data);
      }else{
        alert('Server error');
        console.info(error.message);
      }
    })
  }


  logout(cb) {
    this.authenticated = false;
    cb();
  }

  async isAuthenticated (roles) {

    let reqBody = `roles=${roles}`

    await getExpireUser(reqBody).then(
      authorized => this.state = authorized
    )

    return this.state;
  };
}

export default new AuthService();
