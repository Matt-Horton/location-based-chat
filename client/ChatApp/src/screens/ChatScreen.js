import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {Context as UserInfoContext} from '../context/UserInfoContext';
import {sendMessage} from '../utils/messageUtils';

const ChatScreen = ({route, navigation}) => {
  const [message, setMessage] = useState('');
  const {state} = useContext(UserInfoContext);
  const {chatId} = route.params;

  const submitMessage = () => {
    
    const newMessage = {
      chatId: props.chatId,
      content: message,
    };
    

    sendMessage(newMessage, state.authToken);
  }

  return (
    <View style={styles.container}>
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
