import createDataContext from './createDataContext';
import {reducer} from '../reducers/userInfoReducer';
import {
  ADD_AUTH_TOKEN, INIT_USER_INFO
} from '../constants/persistance';


const initUserInfo = dispatch => {
  return userInfo => {
    dispatch({type: INIT_USER_INFO, payload: userInfo});
  };
};

const addAuthToken = dispatch => {
  return authToken => {
    dispatch({type: ADD_AUTH_TOKEN, payload: authToken});
  };
};

export const {Context, Provider} = createDataContext(
  reducer,
  {
    initUserInfo,
    addAuthToken,
  },
  {},
);