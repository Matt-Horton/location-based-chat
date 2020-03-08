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
    .catch(e => {
      console.log(e.response);
    });
};

const registerUser = (userDetails, initUserInfo, navigateToUpdateProfile) => {
  axios.post("http://10.0.2.2:8091/api/users/register", userDetails)
    .then(res => {
      const decoded = jwt_decode(res.headers['auth-token']);
      console.log(decoded);
      // Add the Auth-Token to the AsyncStorage
      initUserInfo({
        authToken: res.headers['auth-token'],
        userId: decoded.id
      });
      navigateToUpdateProfile();
    })
    .catch(e => {
      console.log(e.response);
    });
};

const updateUserProfile = (userId, userDetails, authToken) => {
  const headers = {
    'auth-token': authToken
  };

  axios.put(`http://10.0.2.2:8091/api/users/${userId}`, 
    userDetails, {headers: headers})
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
}

export {
  loginUser,
  registerUser,
  updateUserProfile,
};