import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Context as UserInfoContext } from '../context/UserInfoContext';
import { getListOfChats } from '../utils/chatUtils';
import ChatListItem from '../components/ChatListItem';
import FormButton from '../components/FormButton';

const DiscoverScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { state } = useContext(UserInfoContext);

  useEffect(() => {
    (async function getChats() {
      getListOfChats(state.authToken, setChats);
    })();
  }, []);

  // Navigate to chat screen
  const navigateToChat = (id) => {
    navigation.navigate('Chat', {
      chatId: id
    });
  };

  // Navigate to create new chat screen
  const navigateToCreateChat = () => {
    navigation.navigate('CreateChat');
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.chatList}
        data={chats}
        renderItem={({ item }) =>
          <ChatListItem chat={item} navigateToChat={navigateToChat} />
        }
        keyExtractor={chat => chat._id}
      />
      <FormButton
        text="Create New Chat"
        submitForm={navigateToCreateChat}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  chatList: {
    alignSelf: 'stretch',
  }
})

export default DiscoverScreen
