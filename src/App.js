import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Text} from 'react-native';
import styles from './styles.js';

import HomeScreen from './screens/HomeScreen.js'
import BookScreen from './screens/bookScreen.js'
import AddBookScreen from './screens/AddBookScreen.js'
import AddPageScreen from './screens/AddPageScreen.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen} 
          options={{
            title: 'TETRADKA',
            headerTransparent: true,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 28,
            },
            headerTitleContainerStyle : {
              width: '100%',
              position: 'absolute',
              left: 0,
              height: 60,
              paddingTop: 12
            }
        }}/> 

        <Stack.Screen name="BookScreen" component={BookScreen}/>

        <Stack.Screen
          name="AddBookScreen" 
          component={AddBookScreen}
          options={{
            title: 'Добавить книгу',
            headerTransparent: true,
            headerTintColor: '#fff',
            headerTitleStyle: {
              textAlign: 'center',
              fontSize: 26,
            },
            headerTitleContainerStyle : {
              width: '60%',
              position: 'absolute',
              left: '20%',
              height: 60,
              paddingTop: 12
            }
        }}/>

        <Stack.Screen name="AddPageScreen" component={AddPageScreen}/>  
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
export default App;
