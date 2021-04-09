import React from 'react';
import {setHeaderOptions} from './RequestHeader';

const URL = 'http://localhost:3000';

class RequestService {

  post(path, reqBody) {
    return fetch(URL+path, setHeaderOptions(reqBody))
    
  }
}

export default new RequestService();
