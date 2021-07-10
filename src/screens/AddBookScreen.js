import React from 'react';
import {View, SafeAreaView, TextInput, ImageBackground,TouchableOpacity,Text} from 'react-native';
import styled from 'styled-components/native';
import styles from '../styles.js';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function AddBookScreen({route, navigation}) {
  const { getItem, setItem } = useAsyncStorage('books');
  const [text, onChangeText] = React.useState('');
  const Options = React.useState(0);

  const AddBook = async (text) => {
    const item = await getItem()
    const arr = (JSON.parse(item))
    const newData = {
      id:  arr.length,
      fullname: text ,
      pages: [], 
  }
    arr.push(newData)
    setItem(JSON.stringify(arr));
    console.log(arr)
    navigation.navigate("HomeScreen")
  }

  return (
    <Container>
      <ImageBackground source={require(`../img/background.jpg`)} resizeMode='cover' style={styles.image}>
        <View style={styles.viewAddBook}>
          <SafeAreaView>
            <TextInput
              style={styles.inputAddBook}
              onChangeText={onChangeText}
              value={text}
              placeholder="Введите название книги"
              placeholderTextColor="#FFFFFF"
            />
          </SafeAreaView>

          <TouchableOpacity
            style={styles.buttonAddBook}
            onPress={() => { 
              if (text != '') {
                AddBook(text) 
                // alert(text + " добавлена")

              }
              else alert("Введите название книги")
            }}>
            <Text style={styles.buttonAddBookText}>Добавить</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Container>
  )
}


const BookName  = styled.Text `
  font-Weight: 800;
  font-size: 28px;
  line-height: 30px;
`;

const Container = styled.View`
    position: relative; 
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;

const EmptyText = styled.Text`
  font-Weight: 400;
  margin: auto
  font-size: 20px;
  align-items: center;
  justify-content: center;
  color: #00000F;
`

const PencilButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius:50px;
  background-color: #1E90FF;
  width: 64px;
  height: 64px;
  position:absolute;
  right:15px;
  bottom:15px; 
`;


const FullName = styled.Text`
    color: #2A86FF;
    font-Weight: bold;
    font-size: 35px;
    margin: auto
    padding: 30px
`;