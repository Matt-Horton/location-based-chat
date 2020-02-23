import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'

const FormButton = props => {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.submitForm()}
    >
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    backgroundColor: '#f57474',
    padding: 8,
    alignSelf: 'stretch',
    height: 60,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
  },
  touchableStyles: {
    flex: 1,
    alignSelf: 'stretch',
  }
});

export default FormButton
