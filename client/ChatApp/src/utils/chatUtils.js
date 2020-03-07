import axios from 'axios';

const getListOfChats = (authToken, setChats) => {
  console.log('Getting chats...');
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

const getChat = (chatId, authToken, setChat) => {
  const headers = {
    'auth-token': authToken
  }

  axios.get(`http://10.0.2.2:8091/api/chats/${chatId}`, { headers: headers })
    .then((result) => {
      console.log('Chat: ', result);
      setChat(result.data);
    })
    .catch(e => {
      console.log(e)
      setChats({});
    });
}

export {
  getListOfChats,
  getChat
};