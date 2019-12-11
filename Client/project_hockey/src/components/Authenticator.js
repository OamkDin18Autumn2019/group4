import axios from 'axios';
import APIconnection from '../APIconnection.json';

let UserInfo = {
  username: null,
  password: null
}

let Authenticator = {
    authenticate: (username, password) => {      
      return new Promise((resolve, reject) => {
        axios.get(APIconnection.baseAddress + '/users/:id', 
          {
              auth: {
              username: username,
              password: password
            }
          })
          .then(result => {
            resolve();
            console.log(result);
          })
          .catch(error => 
            {
              console.log(error);
              reject();
            }
          )
      });
    },
    getAxiosAuth: () => {
      return {
        auth: UserInfo
      }
    } 
}

export default Authenticator;