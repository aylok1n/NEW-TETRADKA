import React, { useState, useEffect } from 'react';
import {Button,View, Platform,} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux'
import {setBooks, addPage } from '../redux/booksSlice'


function AddPageScreen({route, navigation}) {
    const {id, fullname, pages} = route.params;
    const { getItem, setItem } = useAsyncStorage('books');
    const books = useSelector(state => state.books)
	const dispatch = useDispatch()

    React.useLayoutEffect(() => {
        navigation.setOptions({
        headerTransparent: false,
        title: 'Редактировать книгу',
        });
    }, [navigation]);
  
    const DeleteBook = async () => {
        books.splice(('id' == id),  1)
        dispatch(setBooks(books))
        navigation.navigate("HomeScreen")
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 400,
            height: 500,
            cropping: true,
            mediaType: 'photo',
            cropperToolbarTitle: "Редактирование",
            freeStyleCropEnabled: true
        }).then( async (image) => {
            // books.find( (i) => i.id == id).pages.push(image.path)
            dispatch(addPage(image.path))
            navigation.navigate("HomeScreen")
        })
    }

    const takePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
            cropping: true,
            cropperToolbarTitle: "Редактирование",
            freeStyleCropEnabled: true
        }).then( async (images) => {
            images.map( (image) => {
                dispatch(addPage(image.path))
            })
            navigation.navigate("HomeScreen")
        })
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button  title="галерея" onPress={takePhotoFromLibrary} />
        <Button  title="кумера" onPress={takePhotoFromCamera} />
        {/* <Button title="ds" onPress={getBook}></Button> */}
        <DelBook onPress={() => {
            DeleteBook() 
        }}>
            <DelText>Удалить Книгу</DelText>
        </DelBook>
        </View>
    );
    }

const AddBookScreen = styled.TouchableOpacity`
alignItems: center;
justifyContent: center;
`

const DelBook = styled.TouchableOpacity`
align-items: center;
justifyContent: flex-end;
top:250px;
`

const DelText = styled.Text`
color: #DC143C;
font-weight: 700;
font-size: 18px;
padding: 0px 70px;
`
export default AddPageScreen