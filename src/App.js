import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MenuProvider } from 'react-native-popup-menu';

import HomeScreen from './screens/HomeScreen.js'
import BookScreen from './screens/BookScreen.js'
import AddBookScreen from './screens/AddBookScreen.js'

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
                            headerTitleContainerStyle: {
                                width: '100%',
                                position: 'absolute',
                                left: 0,
                                height: 60,
                                paddingTop: 12
                            }
                        }} />
                        
                    <Stack.Screen name="BookScreen" component={BookScreen} />
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
                            headerTitleContainerStyle: {
                                width: '60%',
                                position: 'absolute',
                                left: '20%',
                                height: 60,
                                paddingTop: 12
                            }
                        }} />
                </Stack.Navigator>
            </NavigationContainer>
        </MenuProvider>
    );
}


export default App;
