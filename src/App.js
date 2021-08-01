import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import { MenuProvider } from 'react-native-popup-menu';

import HomeScreen from './screens/HomeScreen.js'
import BookScreen from './screens/bookScreen.js'

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { setBooks } from './redux/booksSlice'

const Stack = createStackNavigator();

const App = () => {
    const books = useSelector(state => state.books)
    const dispatch = useDispatch()
    const { getItem, setItem } = useAsyncStorage('books');

    React.useEffect(async () => {
        const item = await getItem();
        item != null ? dispatch(setBooks(JSON.parse(item))) : dispatch(setBooks([]))
        return async () => {
            await setItem('books', JSON.stringify(books))
        }
    }, [])

    return (
        <MenuProvider>
            <StatusBar animated={true} barStyle={'light-content'} backgroundColor={'#000'} />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{
                            headerStatusBarHeight: 20,
                            title: 'TETRADKA',
                            headerTransparent: true,
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 32,
                            },
                            headerTitleContainerStyle: {
                                width: '100%',
                                position: 'absolute',
                                left: 0,
                            },
                        }} />

                    <Stack.Screen name="BookScreen" component={BookScreen} options={{
                        title: '',
                        headerTransparent: true,
                        headerTitleStyle: {
                            textAlign: 'center',
                            fontSize: 26,
                        },
                        headerTitleContainerStyle: {
                            width: '60%',
                            position: 'absolute',
                            left: '20%',
                            height: 60,
                            paddingTop: 12
                        },
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        </MenuProvider>
    );
}

export default App;
