import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Context as UserInfoContext } from '../context/UserInfoContext';
import { getListOfChats } from '../utils/chatUtils';
import ChatListItem from '../components/ChatListItem';
import socketIOClient from "socket.io-client";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { state } = useContext(UserInfoContext);

  useEffect(() => {
    (async function getChats() {
      getListOfChats(state.authToken, setChats);
    })();

    const socket = socketIOClient(endpoint);
    socket.on("chat message", data => {
      console.log(data);
    });
  }, []);

  // Navigate to chat screen
  const navigateToChat = (id) => {
    navigation.navigate('Chat', {
      chatId: id
    });
  };

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
  chatList: {
    alignSelf: 'stretch',
  }
});

export default HomeScreen;
