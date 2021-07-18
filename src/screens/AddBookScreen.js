import React from 'react';
import {View, SafeAreaView, TextInput, ImageBackground,TouchableOpacity,Text, Alert} from 'react-native';
import styled from 'styled-components/native';
import styles from '../styles.js';
import { addBook } from '../redux/booksSlice.js';
import { useDispatch } from 'react-redux';

export default function AddBookScreen({route, navigation}) {
  	const [text, onChangeText] = React.useState('');

  	const dispatch = useDispatch()

  	const AddBook = async (text) => {
    const newBook = {
    	id: Date.now(),
      	fullname: text ,
      	pages: [], 
	}
	dispatch(addBook(newBook))
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
              }
              else Alert.alert('','Введите название книги')
            }}>
            <Text style={styles.buttonAddBookText}>Добавить</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Container>
  )
}

const Container = styled.View`
    position: relative; 
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;