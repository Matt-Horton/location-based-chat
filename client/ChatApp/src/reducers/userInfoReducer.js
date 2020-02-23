import AsyncStorage from '@react-native-community/async-storage';
import {
  USER_INFO_KEY,
  ADD_AUTH_TOKEN,
  INIT_USER_INFO,
} from '../constants/persistance';

const updateDB = async newState => {
  try {
    await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(newState));
    return newState;
  } catch (e) {
    console.log(e);
  }
};

export const reducer = (state, action) => {
  switch(action.type) {
    case INIT_USER_INFO:
      var newState = {...action.payload};
      updateDB(newState);
      return newState;
    case ADD_AUTH_TOKEN:
      var newState = {...state, authToken: action.payload};
      updateDB(newState);
      return newState;
    default:
      return state;
  }
}