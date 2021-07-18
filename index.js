/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import booksSlice from './src/redux/booksSlice';

const store = configureStore({
    reducer: booksSlice
})

const AppProvider = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppProvider);
