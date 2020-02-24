import axios from 'axios';

const getListOfChats = (authToken, setChats) => {
  const headers = {
    'auth-token': authToken
  }

  axios.get("http://10.0.2.2:8091/api/chats/", { headers: headers })
    .then((result) => {
      console.log('Chats: ', result);
      setChats(result.data);
    })
    .catch(e => {
      console.log(e)
      setChats([]);
    });
};

export {
  getListOfChats
};