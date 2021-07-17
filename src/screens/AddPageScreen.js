import React, { useState, useEffect } from 'react';
import {Button,View, Platform,} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';



function AddPageScreen({route, navigation}) {
    const {Id, Name, Pages} = route.params;
    const { getItem, setItem } = useAsyncStorage('books');
    const Options = React.useState(0);
     React.useLayoutEffect(() => {
        navigation.setOptions({
        headerTransparent: false,
        title: 'Редактировать книгу',
        });
    }, [navigation, Options]);

/// IMAGE PICKER
    const [image, setImage] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);

    const pickImage = async () => {
    // let result = launchImageLibrary({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 5],
    //   quality: 1,
    // });
    // console.log(result);
    // if (!result.cancelled) {
    //   setImage(result.uri);
    //   const item = await getItem();
    //   const arr = (JSON.parse(item));
    //   arr[Id].pages.push(result.uri)
    //   setItem(JSON.stringify(arr));
    //   console.log(arr)
    //   navigation.navigate("HomeScreen")
    // }
  };

  
    const DeleteBook = async () => {
        const item = await getItem()
        const arr = (JSON.parse(item))
        arr.splice(('fullname' == Name),  1)
        setItem(JSON.stringify(arr));
        console.log('Это после', arr)
        navigation.navigate("HomeScreen")

  }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 400,
            height: 500,
            cropping: true,
            mediaType: 'photo'
        }).then( async (image) => {
            setImage(image.path)
            const item = await getItem()
            const arr = (JSON.parse(item))
            arr[Id].pages.push(image.path)
            setItem(JSON.stringify(arr))
        }).then(
            navigation.navigate("HomeScreen")
        )
    }

    const takePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo'
        }).then( async (images) => {
            const item = await getItem()
            const arr = (JSON.parse(item))
            images.map( (image) => {
                console.log(image.path)
                setImage(image.path)
                arr[Id].pages.push(image.path)
            })
            setItem(JSON.stringify(arr))
        }).then(
            navigation.navigate("HomeScreen")
        )
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button  title="галерея" onPress={takePhotoFromLibrary} />
        <Button  title="кумера" onPress={takePhotoFromCamera} />

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