import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SendMessageBtn = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}>
      <View style={styles.btnContainer}>
        <Icon
          name="md-send"
          size={20}
          color="#fff"
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#db4f4f',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  }
});

export default SendMessageBtn
