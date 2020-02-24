import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

const FormInput = props => {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.formText}
        value={props.value}
        onChangeText={text => props.updateValue(text)}
        placeholder={props.placeholder}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#F7F9FA',
    borderRadius: 10,
    height: 60,
    padding: 8,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  formText: {
    fontWeight: '500',
    fontSize: 16,
  },
});

export default FormInput