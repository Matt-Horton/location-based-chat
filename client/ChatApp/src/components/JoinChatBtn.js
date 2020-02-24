import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'

const JoinChatBtn = props => {
  return (
    <TouchableWithoutFeedback 
      onPress={props.onPress}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    width: 70,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#f57474',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
  }
});

export default JoinChatBtn
