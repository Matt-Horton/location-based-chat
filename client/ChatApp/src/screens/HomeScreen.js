import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DiscoverScreen from '../screens/DiscoverScreen';
import ChatScreen from '../screens/ChatScreen';
import MapView from 'react-native-maps';
import CreateChat from './CreateChat';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import { Context as UserInfoContext } from '../context/UserInfoContext';
import { arrayBufferToBase64 } from '../utils/imageUtils';

const ChatStack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const {state} = useContext(UserInfoContext);
  const [profile, setProfile] = useState('');

  useEffect(() => {
    console.log('Home screen state: ', state);
    const base64Image = arrayBufferToBase64(state.image.data);
    setProfile(base64Image);
    //requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        alert("You can use the location");

        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        console.log("Location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <View style={styles.mainContainer} >
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
        <Image 
          source={{uri: `data:image/jpeg;base64,${profile}`}}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.chatWindow}>
        <ChatStack.Navigator initialRouteName="Discover">
          <ChatStack.Screen
            name="Discover"
            component={DiscoverScreen}
            options={{
              headerShown: false,
            }}
          />
          <ChatStack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
          />
          <ChatStack.Screen
            name="CreateChat"
            component={CreateChat}
            options={{
              headerShown: false,
            }}
          />
        </ChatStack.Navigator>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  chatWindow: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexGrow: 3,
    marginTop: -15,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15
  },
  mapContainer: {
    flexGrow: 2,
  },
  map: {
    flex: 1,
    alignItems: 'stretch',
  },
  profileImage: {
    position: 'absolute',
    marginTop: 20,
    right: 10,
    top: 10,
    backgroundColor: '#000',
    width: 50,
    height: 50,
    borderRadius: 10,
    borderColor: '#f57474',
    borderWidth: 3,
    marginRight: 30,
  }
});

export default HomeScreen;
