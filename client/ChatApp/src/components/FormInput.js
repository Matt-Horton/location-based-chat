import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

const FormInput = props => {
  return (
    <View style={[styles.formContainer, props.style]}>
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
    height: 50,
    padding: 4,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flex: 1,
    maxHeight: 50,
  },
  formText: {
    fontWeight: '500',
    fontSize: 16,
  },
});

export default FormInput
