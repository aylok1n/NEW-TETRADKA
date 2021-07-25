import React from 'react';
import {Text, Dimensions, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import {Menu, MenuOptions, MenuOption, MenuTrigger,renderers} from 'react-native-popup-menu';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector, useDispatch } from 'react-redux'
import { addPage, deleteBook } from '../redux/booksSlice'
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Share from 'react-native-share'

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.9

const PopUpMenu = ({navigation}) => {
    const books = useSelector(state => state.books)
    const bookId = useSelector(state => state.currentId) 
	const dispatch = useDispatch()

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 612,
            height: 792,
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

    const createPDF = async () => {
        const html = `<h1 style='text-align: center'>${books.find((i) => i.id == bookId).fullname}</h1>
        ${books.find((i) => i.id == bookId).pages.map(i => `<img style='width:100%; height:900px' src="${i}"/>`)}`
        const options = {
          html,
          fileName: books.find((i) => i.id == bookId).fullname,
          directory: 'Documents',
        };
    
        let file = await RNHTMLtoPDF.convert(options)
        console.log(file.filePath);
        Share.open({
            url: 'file://'+file.filePath,
            title: 'Поделиться PDF'
        });
        // Share.share()
    }

    return (
        <Container >
        <Menu renderer={renderers.SlideInMenu} >
            <MenuTrigger customStyles={triggerStyles} text='+'>
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
                <MenuOption onSelect={takePhotoFromCamera} text='Открыть камеру'/>
                <MenuOption onSelect={takePhotoFromLibrary} text='Добавить фото из галереи'/>
                <MenuOption onSelect={createPDF} text='Поделиться PDF'/>
            </MenuOptions>
      </Menu>
    </Container>
    )
}

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