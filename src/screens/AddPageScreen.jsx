import React, { useState, useEffect } from 'react';
import {Button,View, Platform,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      const item = await getItem();
      const arr = (JSON.parse(item));
      arr[Id].pages.push(result.uri)
      setItem(JSON.stringify(arr));
      console.log(arr)
      navigation.navigate("HomeScreen")
    }
  };

  
  const DeleteBook = async () => {
    const item = await getItem()
    const arr = (JSON.parse(item))
    // const fn = arr[Id].fullname
    arr.splice(('fullname' == Name),  1)
    setItem(JSON.stringify(arr));
    console.log('Это после', arr)
    navigation.navigate("HomeScreen")

  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button  title="Добавить фото из галереи" onPress={pickImage} />

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