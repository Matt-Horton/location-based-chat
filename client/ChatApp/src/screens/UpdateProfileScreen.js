import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { Context as UserInfoContext } from '../context/UserInfoContext';
import { updateUserProfile, getUserAvatar } from '../utils/auth';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const UpdateProfileScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const { state, initUserInfo } = useContext(UserInfoContext);

  const submitUpdateProfile = () => {

    const userDetails = {
      firstName: firstName,
      lastName: lastName,
      bio: bio,
      photo: avatar
    };

    updateUserProfile(state.userId, userDetails, state.authToken, storeUserDetails);
  };

  const storeUserDetails = (userDetails) => {
    console.log("User details: ", userDetails);
    console.log("State previous: ", state);
    initUserInfo({authToken: state.authToken, ...userDetails});
    navigation.navigate('Home');
  }

  const selectProfilePicture = () => {
    console.log(state.userId);

    ImagePicker.showImagePicker(response => {
      console.log("Response: ", response);
      if (response.uri) {
        ImageResizer.createResizedImage(
          response.uri,
          300,
          300,
          'JPEG',
          50,
          0,
          "/storage/emulated/0/Pictures/")
          .then((response) => {
            setAvatar(response);
          }).catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: avatar.uri }}
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
