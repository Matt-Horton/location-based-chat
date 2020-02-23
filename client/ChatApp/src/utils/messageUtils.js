import axios from 'axios';

const sendMessage = (newMessage, authToken) => {
  console.log(newMessage);

  const headers = {
    'auth-token': authToken
  }

  axios.post("http://10.0.2.2:8091/api/messages/post", {
    chatId: newMessage.chatId,
    content: newMessage.content
  }, {headers: headers})
  .then((result) => {
    console.log(result);
  })
  .catch(e => console.log(e));
};

export {
  sendMessage
};