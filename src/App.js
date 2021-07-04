import React from 'react';
import {ScrollView,Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './styles.js';

import HomeScreen from './screens/HomeScreen.js'
import BookScreen from './screens/bookScreen.js'
import AddBookScreen from './screens/AddBookScreen.js'
import AddPageScreen from './screens/AddPageScreen.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer style={styles.App}>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} /> 

        <Stack.Screen name="BookScreen" component={BookScreen}/>

        <Stack.Screen name="AddBookScreen" component={AddBookScreen}/>

        <Stack.Screen name="AddPageScreen" component={AddPageScreen}/>  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
