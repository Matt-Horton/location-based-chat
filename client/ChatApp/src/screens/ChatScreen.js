import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Context as UserInfoContext } from '../context/UserInfoContext';
import { sendMessage } from '../utils/messageUtils';
import io from 'socket.io-client';
import { getChat } from '../utils/chatUtils';
import SendMessageBtn from '../components/SendMessageBtn';
import MyChatMessage from '../components/MyChatMessage';
import OtherChatMessage from '../components/OtherChatMessage';

const ChatScreen = ({ route, navigation }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState({});
  const { state } = useContext(UserInfoContext);
  const { chatId } = route.params;
  const socket = io("http://10.0.2.2:8091", {
      query: {
        userId: state._id,
        chatId, chatId
      }
    });

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
      userId: state._id,
      content: message,
    };

    socket.emit('chat message', newMessage);
    setChat({ ...chat, messages: [...chat.messages, newMessage] });
    setMessage('');
  }

  const renderOtherMessage = (messageItem) => {
    const user = chat.users.find(user =>
       user._id === messageItem.userId);
    
    return <OtherChatMessage 
        user={user}
        message={messageItem}
      />
  }

  const renderMessage = (messageItem) => {
    if (messageItem.userId === state._id) {
      return <MyChatMessage text={messageItem.content}/>;
    } else {
      return renderOtherMessage(messageItem);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chat.messages}
        renderItem={({ item }) => renderMessage(item)}
        keyExtractor={item => item._id}
      />
      <View style={styles.messageInputContainer}>
        <FormInput
          style={styles.messageInput}
          placeholder="Write a message.."
          updateValue={setMessage}
          value={message}
        />
        <SendMessageBtn
          style={styles.sendBtn}
          onPress={submitMessage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  messageInputContainer: {
    marginTop: 10,
    height: 50,
    display: 'flex',
    flexDirection: 'row'
  },
});

export default ChatScreen
