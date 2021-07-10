import React from 'react';
import styled from 'styled-components/native';
import {ScrollView,Text, TouchableOpacity, ImageBackground, Alert  } from 'react-native';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Feather';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Books from '../Components/books';
import { useIsFocused } from '@react-navigation/native'


function HomeScreen({route,navigation }) {
  const Options = React.useState(0);
  const [arr, setArr] = React.useState([])
  const { getItem, setItem } = useAsyncStorage('books');

  const isFocused = useIsFocused()

  React.useEffect(() => {
    readItemFromStorage();
    console.log('read')
    setArr(arr)
  } , [isFocused])


  const readItemFromStorage = async () => {
    const item = await getItem();
    item != null ? setArr(JSON.parse(item)) :  Alert.alert(
        "Добро пожаловать",
        "Ваш список книг пуст. Добавить книгу?",
        [
            {
                text: "Нет, спасибо",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { 
                text: "Добавить", 
                onPress: () => navigation.navigate('AddBookScreen') 
            },
        ]
      );;
  };

  const writeItemToStorage = async  () => { 
  await setItem(JSON.stringify(arr)); 
  };

  React.useEffect(() => {
    writeItemToStorage();  
    console.log('writeItemToStorage');
  }, [arr])

  return (
    <Container>
      <ImageBackground source={require(`../img/background.jpg`)} resizeMode="cover" style={styles.image}>
        <ScrollView style={styles.scrollView}>
          {arr.map((items, index,) => <Books  key={index} {...items} />)}
        </ScrollView>
        <PlusButton 
          onPress={() => navigation.navigate('AddBookScreen')} 
          style ={{shadowColor: "#1E90FF;", elevation: 8,}}>
          <Icon name="folder-plus" size={50} color="white" />
        </PlusButton>
      </ImageBackground>
    </Container> 
  );
}

export default HomeScreen;

const PlusButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    border-radius:50px;
    background-color: transparent;
    position:absolute;
    right:25px;
    bottom:25px;
`;

const Container = styled.View`
  flex: 1;
`;