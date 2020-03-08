import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { Context as UserInfoContext } from '../context/UserInfoContext';
import { updateUserProfile } from '../utils/auth';
import ImagePicker from 'react-native-image-picker';

const UpdateProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');
  const { state } = useContext(UserInfoContext);

  const submitUpdateProfile = () => {
    const userDetails = {
      firstName: firstName,
      lastName: lastName,
      bio: bio
    };

    updateUserProfile(state.userId, userDetails, state.authToken);
  };

  const selectProfilePicture = () => {

    ImagePicker.showImagePicker(response => {
      console.log(response.path);
      if (response.uri) {

        let source = { uri: response.uri };
        console.log(response);
        setPhoto(source);
      }
    })
  };

  return (
    <View style={styles.container} >
      <Image
        source={{ uri: photo.uri }}
        style={{ width: 100, height: 100, borderColor: '#000', borderWidth: 1 }}
      />
      <FormButton
        text="Choose Profile Picture"
        submitForm={selectProfilePicture}
      />
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
