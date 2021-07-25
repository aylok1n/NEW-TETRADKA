import React from 'react';
import { Modal, View, Tex } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrenId } from '../redux/booksSlice'

const BookItem = ({id, fullname, pages}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const openBook = () => {
        dispatch(setCurrenId(id))
        navigation.navigate('BookScreen')
    }

    let textAvatar = fullname.split(' ')
    
    return (
        <Container
        onPress={openBook}
        >

        <Avatar>
        <Icon name="book-open" size={60} color="white">
        </Icon>
            <TextAvatar>
            {textAvatar[0][0].toUpperCase() }   {textAvatar[1] ? textAvatar[1][0] : '   '}
            </TextAvatar>
        </Avatar>
        <FullName>{fullname}</FullName>
        </Container>
    )
};



const FullName = styled.Text`
  font-weight: bold;
  font-size: 30px;
  padding: 0px 40px 0px 30px;
  color: white;
`;
const TextAvatar = styled.Text`
  font-weight: bold;
  fontSize: 24px;
  text-align: center;
  color: #FFFFFF;
  position: absolute;
  bottom: 24px;
  color: #1E90FF;
  text-shadow: 0px 0px 5px #000000;
`;

const Avatar = styled.View`
  align-items: center;
  flex-direction: row;
  width:80px;
  height:80px;
  background-color: transparent;
  justify-content: center;
`;

const Container = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  borderRadius: 20px;
  borderColor: #F4FFFF;
  padding:10px 15px;
  margin:5px auto;
  background-color: rgba(0, 0, 0, 0.85);
  width: 90%
`;

export default BookItem





