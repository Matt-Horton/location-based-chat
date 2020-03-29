import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { registerUser } from '../utils/auth';
import { Context as UserInfoContext } from '../context/UserInfoContext';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const { initUserInfo } = useContext(UserInfoContext);

  const submitForm = () => {
    const userDetails = {
      email: email,
      password: password,
      password2: password2,
    };

    registerUser(userDetails, initUserInfo, navigateToUpdateProfile);
  }

  const navigateToUpdateProfile = () => {
    navigation.navigate('UpdateProfile');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Sign Up</Text>
      <Text style={styles.formDescription}>Create an account to get started</Text>
      <FormInput
        placeholder="Email address"
        updateValue={setEmail}
        value={email}
      />
      <FormInput
        placeholder="Password"
        updateValue={setPassword}
        value={password}
      />
      <FormInput
        placeholder="Confirm password"
        updateValue={setPassword2}
        value={password2}
      />
      <FormButton submitForm={submitForm} text="Continue" />
      <Text>Already have an account?
      <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={styles.textLink}
            onPress={() => console.log('Go to sign Up')}
          >
            Sign In
        </Text>
        </TouchableWithoutFeedback>
      </Text>
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
  formTitle: {
    fontSize: 35,
    color: '#626262',
    fontWeight: '700',
    marginBottom: 20,
  },
  formDescription: {
    fontSize: 16,
    color: '#b8b8b8',
    fontWeight: '700',
    marginBottom: 12,
  },
  textLink: {
    color: '#f57474',
  },
});

export default RegisterScreen
