import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const OtherChatMessage = (props) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.usersName}>
        {props.user.firstName} {props.user.lastName}
      </Text>
      <View style={styles.messageBodyContainer}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${props.user.image}` }}
          style={styles.profileImage}
        />
        <View style={styles.messageTextContainer}>
          <Text>{props.message.content}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    maxWidth: 300,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  messageBodyContainer: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  usersName: {
    color: '#666',
    marginLeft: 50
  },
  messageTextContainer:{
    padding: 10,
    backgroundColor: '#F7F9FA',
    borderRadius: 10,
  }
});

export default OtherChatMessage
