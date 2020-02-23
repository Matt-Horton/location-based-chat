import axios from 'axios';
import jwt_decode from 'jwt-decode';

const loginUser = (userData, initUserInfo, navigateToHome) => {
  axios.post("http://10.0.2.2:8091/api/users/login", userData)
    .then(res => {
      console.log(res.headers['auth-token']);
      const decoded = jwt_decode(res.headers['auth-token']);
      console.log(decoded);
      // Add the Auth-Token to the AsyncStorage
      initUserInfo({
        authToken: res.headers['auth-token'],
        userId: decoded.id
      });
      navigateToHome();
    })
    .catch(err => {
      console.log(err.response);
    });
};

export {
  loginUser
};