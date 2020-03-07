import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DiscoverScreen from '../screens/DiscoverScreen';
import ChatScreen from '../screens/ChatScreen';
import MapView from 'react-native-maps';

const ChatStack = createStackNavigator();

const HomeScreen = ({ navigation }) => {

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
