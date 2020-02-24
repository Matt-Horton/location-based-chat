import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import JoinChatBtn from './JoinChatBtn'

const ChatListItem = props => {

  const goToChatScreen = () => {
    props.navigateToChat(props.chat._id);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.chatTitle}>{props.chat.name}</Text>
      <JoinChatBtn text="Join" onPress={goToChatScreen} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  chatTitle: {
    flexGrow: 1,
    fontWeight: '700',
    fontSize: 18,
    color: '#444'
  }
});

export default ChatListItem
