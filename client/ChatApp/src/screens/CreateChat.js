import React, {useState, useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { createNewChat } from '../utils/chatUtils';
import { Context as UserInfoContext } from '../context/UserInfoContext';

const CreateChat = () => {
  const [chatTitle, setChatTitle] = useState('');
  const { state } = useContext(UserInfoContext);

  const submitCreateChatForm = () => {
    const newChat = {
      name: chatTitle
    };
    createNewChat(newChat, state.authToken);
  }

  return (
    <View style={styles.container} >
      <FormInput
        placeholder="My new chat"
        value={chatTitle}
        updateValue={setChatTitle}
      />
      <FormButton
        text="Submit"
        submitForm={submitCreateChatForm}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
})

export default CreateChat
