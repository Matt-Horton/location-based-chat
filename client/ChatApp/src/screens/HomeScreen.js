import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DiscoverScreen from '../screens/DiscoverScreen';
import ChatScreen from '../screens/ChatScreen';
import MapView from 'react-native-maps';
import CreateChat from './CreateChat';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
const ChatStack = createStackNavigator();

const HomeScreen = ({ navigation }) => {

  useEffect(() => {
    requestLocationPermission();
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
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <View style={styles.mainContainer} >
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
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
    borderRadius: 20,
    flexGrow: 3,
    marginTop: -15,
    padding: 20,
  },
  map: {
    flexGrow: 2,
  },
});

export default HomeScreen;
