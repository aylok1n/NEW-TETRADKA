import React from 'react';
import {ScrollView, Button } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PageItem from '../Components/PageItem'
import CreatePDF from '../Components/CreatePDF'

function BookScreen({route, navigation}) {
  const {itemId, itemName, itemPages} = route.params;
  const Options = React.useState(0);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      headerRight: () => (
        <Del  onPress={() => alert('Вот собственно, осталось только перегнать это все в пдф')} >
          <MaterialCommunityIcons name="pdf-box" size={30} color="black" />
        </Del>
      ),
    });
  }, [navigation, Options]);
  if(itemPages != 0){
    return (
      <Container onPress={() => navigation.navigate('BookScreen')}>
        <ScrollView style={styled.scrollView}>
        <FullName>{itemName}</FullName>
        
        {itemPages.map((page, id) => <PageItem key={id} source={{uri: page}} />)}
  
        <Button
          title= "На главную"
          onPress={() => navigation.navigate('HomeScreen')}
          style = {{width:16, padding: 10}}
        />
        </ScrollView>
        <PencilButton 
          onPress={() => navigation.navigate('AddPageScreen', {
            Id: itemId,
            Name: itemName,
            Pages: itemPages,
          })} 
          style ={{shadowColor: "#000",shadowOffset: {width: 0,height: 4,},shadowOpacity: 1.5,shadowRadius: 2.5,elevation: 10,}}>
          <MaterialCommunityIcons name="pencil-outline" size={30} color="white" />
        </PencilButton>
      </Container>
      )
  }
  else {
    return (
      <Container>
        <PencilButton 
            onPress={() => navigation.navigate('AddPageScreen', {
              Id: itemId,
              Name: itemName,
              Pages: itemPages,
            })} 
          style ={{shadowColor: "#000",shadowOffset: {width: 0,height: 4,},shadowOpacity: 1.5,shadowRadius: 2.5,elevation: 10,}}>
          <MaterialCommunityIcons name="pencil-outline" size={24} color="black" />
        </PencilButton>
        <ScrollView style={{marginEnd:10}}>
        <FullName>{itemName}</FullName>
        <EmptyText>{itemName} пуста</EmptyText>
        <Button
          title= "На главную"
          onPress={() => navigation.navigate('HomeScreen')}
        />
        </ScrollView>

      </Container>
    )
  }
}


const BookName  = styled.Text `
  font-Weight: 800;
  font-size: 28px;
  line-height: 30px;
`;
const Del = styled.TouchableOpacity`
align-items: center;
justify-content: center;
right:15px;
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
export default BookScreen;