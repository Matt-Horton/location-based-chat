import React, {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {Context as UserInfoContext} from '../context/UserInfoContext';
import {sendMessage} from '../utils/messageUtils';
import socketIOClient from "socket.io-client";
import {getChat} from '../utils/chatUtils';

const ChatScreen = ({route, navigation}) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState({});
  const {state} = useContext(UserInfoContext);
  const {chatId} = route.params;
  const socket = socketIOClient("http://10.0.2.2:8091");

  useEffect(() => {

    (async function getChats() {
      getChat(chatId, state.authToken, updateChatMessages);
    })();

    socket.on("chat message", msg => {
      console.log('Received Message: ', msg);
    });
  }, []);

  function updateChatMessages(data) {
    setChat(data);
  }

  const submitMessage = () => {
    
    const newMessage = {
      chatId: chatId,
      userId: state.userId,
      content: message,
    };
    
    socket.emit('chat message', newMessage);
    setChat({...chat, messages: [...chat.messages, newMessage]});
    setMessage('');
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chat.messages}
        renderItem={({item}) => <Text>{item.content}</Text>}
        keyExtractor={item => item._id}
      />
      <Text>{chatId}</Text>
      <FormInput
        placeholder="Write a message.."
        updateValue={setMessage}
        value={message}
      />
      <FormButton text="Send" submitForm={submitMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ChatScreen
