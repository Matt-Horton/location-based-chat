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
        authToken: res.headers['auth-token'], ...res.data
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

const updateUserProfile = (userId, userDetails, authToken, storeUserDetails) => {

  let data = new FormData();
  data.append('firstName', userDetails.firstName);
  data.append('lastName', userDetails.lastName);
  data.append('bio', userDetails.bio);

  data.append('avatar', {
    uri: userDetails.photo.uri,
    type: 'image/' + userDetails.photo.type,
    name: userDetails.photo.name
  });

  axios.put(`http://10.0.2.2:8091/api/users/${userId}`,
    data)
    .then(res => {
      storeUserDetails(res.data);
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