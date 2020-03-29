import React from 'react'
import { View, Text, StyleSheet} from 'react-native'

const MyChatMessage = (props) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f57474',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  messageText: {
    color: '#fff',
  }
});

export default MyChatMessage
