/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView,ScrollView,StatusBar, Text, useColorScheme, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen name="BookScreen" component={BookScreen}/>

      <Stack.Screen name="AddBookScreen" component={AddBookScreen}/>

      <Stack.Screen name="AddPageScreen" component={AddPageScreen}/>  
    </Stack.Navigator>
  </NavigationContainer>
  );
};


export default App;
