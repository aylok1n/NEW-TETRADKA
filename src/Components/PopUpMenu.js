import React from 'react';
import {Text, Dimensions, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native';
import styles from '../styles.js';
import {Menu, MenuOptions, MenuOption, MenuTrigger,renderers} from 'react-native-popup-menu';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector, useDispatch } from 'react-redux'
import { addPage, deleteBook } from '../redux/booksSlice'
  
const PopUpMenu = ({navigation}) => {
    const books = useSelector(state => state.books)
	const dispatch = useDispatch()
    const DeleteBook = async () => {
        navigation.navigate("HomeScreen")
        dispatch(deleteBook())
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
            dispatch(addPage(image.path))
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
        })
    }
    return (
        <Container >
        <Menu renderer={renderers.SlideInMenu} >
            <MenuTrigger customStyles={triggerStyles} text='...'>
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
                <MenuOption onSelect={takePhotoFromCamera} text='Открыть камеру'/>
                <MenuOption onSelect={takePhotoFromLibrary} text='Добавить фото из галереи'/>
                <MenuOption onSelect={DeleteBook}><Text style={styles.deleteText}>Удалить</Text></MenuOption>
            </MenuOptions>
      </Menu>
    </Container>
    )
}

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.9

const Container = styled.View`
    z-index: 9999;
    position: absolute;
    width: ${Math.round(width)}px;
    align-items: flex-end;
`;

const triggerStyles = {
    triggerText: {
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
        letterSpacing: -1.9,
        transform: [{ rotateZ: '-90deg'}],
        padding: 30,
        paddingBottom: 20,
        paddingLeft: 30,
        marginTop: -20,
        zIndex: 999,
        borderRadius: 50,
    },
    TriggerTouchableComponent: TouchableOpacity,
};

const optionsStyles = {
    optionsContainer: {
      alignItems: 'center',
      borderTopStartRadius: 40,
      borderTopEndRadius: 40,
      elevation: 125,
    },
    optionsWrapper: {
        backgroundColor: 'transparent',
        width: width,
        borderRadius: 40,
    },
    optionWrapper: {
        margin: 12,
    },
    optionText: {
      color: '#1E90FF',
      textAlign: 'center',
      fontSize: 20
    },
  };

export default PopUpMenu