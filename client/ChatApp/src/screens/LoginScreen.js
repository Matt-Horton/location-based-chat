import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import { loginUser } from '../utils/auth';
import { Context as UserInfoContext } from '../context/UserInfoContext';
import AsyncStorage from '@react-native-community/async-storage';
import {
  USER_INFO_KEY
} from '../constants/persistance';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state } = useContext(UserInfoContext)
  const { initUserInfo } = useContext(UserInfoContext);

  useEffect(() => {
    // Using an IIFE
    (async function fetchUserInfo() {
      try {
        console.log('Fetching User Info from DB...');
        const userInfo = await AsyncStorage.getItem(USER_INFO_KEY);
        console.log('User Info: ', JSON.parse(userInfo));
        if (userInfo._id) {
          // Set context to projects
          initUserInfo(JSON.parse(userInfo));
          navigation.navigate('Home');
        } else {
          console.log("User Info doesn't exist");
          // Create projects in DB
          await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify({}));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const submitForm = () => {
    const userData = {
      email: email,
      password: password,
    };

    loginUser(userData, initUserInfo, navigateToHome);
  }

  const navigateToHome = () => {
    console.log('Navigating To The Home Screen');
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Sign In</Text>
      <Text style={styles.formDescription}>Please enter your email and password to sign in</Text>
      <FormInput
        style={styles.formInput}
        placeholder="Email address"
        updateValue={setEmail}
        value={email}
      />
      <FormInput
        style={styles.formInput}
        placeholder="Password"
        updateValue={setPassword}
        value={password}
      />
      <FormButton submitForm={submitForm} text="Sign In" />
      <View style={styles.bottomText}>
        <Text style={styles.infoText}>Don't have an account?</Text>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Register')}>
          <Text
            style={styles.textLink}
            onPress={() => console.log('Go to sign Up')}
          >
            Sign Up
          </Text>
        </TouchableWithoutFeedback>
      </View>
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
  formInput: {
    marginBottom: 30,
  },
  bottomText: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    color: '#777',
    fontWeight: '700',
  },
  textLink: {
    color: '#f57474',
    fontWeight: '700',
    marginLeft: 5,
  },
});

export default LoginScreen
