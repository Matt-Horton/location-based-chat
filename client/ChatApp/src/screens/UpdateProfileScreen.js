import React, {useState, useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import {Context as UserInfoContext} from '../context/UserInfoContext';
import {updateUserProfile} from '../utils/auth';

const UpdateProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const { state } = useContext(UserInfoContext);

  const submitUpdateProfile = () => {
    const userDetails = {
      firstName: firstName,
      lastName: lastName,
      bio: bio
    };

    updateUserProfile(state.userId, userDetails, state.authToken);
  }

  return (
    <View style={styles.container} >
      <FormInput 
        placeholder='First Name'
        value={firstName}
        updateValue={setFirstName}
      />
      <FormInput
        placeholder='Last Name'
        value={lastName}
        updateValue={setLastName}
      />
      <FormInput
        placeholder='Bio'
        value={bio}
        updateValue={setBio}
      />
      <FormButton 
        text="Submit"
        submitForm={submitUpdateProfile}
      />
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
});

export default UpdateProfileScreen
