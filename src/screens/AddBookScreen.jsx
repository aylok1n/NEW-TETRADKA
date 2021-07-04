import React from 'react';
import {StyleSheet, View, Button,  SafeAreaView, TextInput, Alert  } from 'react-native';
import styled from 'styled-components/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

function AddBookScreen({route, navigation}) {
  const { getItem, setItem } = useAsyncStorage('books');
  const [text, onChangeText] = React.useState('');
  // const { arr, add } = route.params;
  const Options = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      title: 'Добавить книгу',
    });
  }, [navigation, Options]);

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
    // setTimeout(navigation.navigate("HomeScreen"), 1000)
  }

  return (
    <View>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Введите название книги"
        />
      </SafeAreaView>

      <Button 
        onPress={() => { 
          if (text != '') {
            AddBook(text) 
            // alert(text + " добавлена")

          }
          else alert("Введите название книги")
        }}
        title= "Добавить"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

const BookName  = styled.Text `
  font-Weight: 800;
  font-size: 28px;
  line-height: 30px;
`;

const Container = styled.View`
  flex: 1; 
  align-items: center;
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
export default AddBookScreen;