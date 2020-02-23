import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {Context as UserInfoContext} from '../context/UserInfoContext';
import {sendMessage} from '../utils/messageUtils';

const HomeScreen = () => {
  const [message, setMessage] = useState('');
  const {state} = useContext(UserInfoContext);

  const submitMessage = () => {
    
    const newMessage = {
      chatId: '1234',
      content: message,
    };
    

    sendMessage(newMessage, state.authToken);
  }

  return (
    <View style={styles.container}>
      <FormInput
        placeholder="Write a message.."
        updateValue={setMessage}
        value={message}
      />
      <FormButton text="Send" submitForm={submitMessage} />
    </View>
  )
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

export default HomeScreen;
