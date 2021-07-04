import React from 'react';
import styled from 'styled-components/native';
import {ScrollView,Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Books from '../Components/Books';
import SectionTittle from '../Components/SectionTittle'
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
    item != null ? setArr(JSON.parse(item)) : alert('Добавьте свою первую книгу');
  };

  const writeItemToStorage = async  () => { 
  await setItem(JSON.stringify(arr)); 
  };

  React.useEffect(() => {
    writeItemToStorage();  
    console.log('writeItemToStorage');
  }, [arr])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'TETRADKA',
      headerTintColor: '#2A86FF',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
      },
      headerRight: () => (
        <Dots  onPress={() => setArr([])}>
          <Text style={{color: 'red'}}>Clear</Text>
        </Dots>
      ),
    });
  }, [navigation, Options]);

  return (
    <Container>
     <ScrollView>
        <SectionTittle>Ваши Тетради</SectionTittle>

        {arr.map((items, index,) => <Books  key={index} {...items} />)}

      </ScrollView>

      <PlusButton 
        onPress={() => navigation.navigate('AddBookScreen')} 
        style ={{shadowColor: "#000",shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.5,shadowRadius: 2.5,elevation: 5,}}>
        <Ionicons name="ios-add" size={36} color="white" />
      </PlusButton>
    </Container> 
  );
}

export default HomeScreen;

const Dots = styled.TouchableOpacity`
align-items: center;
justify-content: center;
right:15px;
`;

const PlusButton = styled.TouchableOpacity`
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

const Container = styled.View`
  padding: 5%;
  flex: 1;
  backgroundColor: #FFFFFF;
`;