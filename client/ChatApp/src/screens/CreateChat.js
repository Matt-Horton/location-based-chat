import React, {useState, useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { createNewChat } from '../utils/chatUtils';
import { Context as UserInfoContext } from '../context/UserInfoContext';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateChat = ({navigation}) => {
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
      <View style={styles.navigationContainer}>
        <Icon
          name="md-arrow-round-back"
          color="#f57474"
          size={25}
          onPress={() => navigation.goBack()}
        />
      </View>
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
    backgroundColor: '#fff',
  },
  navigationContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 10
  },
})

export default CreateChat
