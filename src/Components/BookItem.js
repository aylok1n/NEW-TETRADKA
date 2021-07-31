import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux'
import { setCurrenId } from '../redux/booksSlice'

const BookItem = ({ id, fullname, pages }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const openBook = () => {
        dispatch(setCurrenId(id))
        navigation.navigate('BookScreen')
    }

    let textAvatar = fullname.split(' ')
    var date = new Date(id);


    return (
        <Container
            onPress={openBook}
            onPressIn={() => dispatch(setCurrenId(id))}
        >
            <Avatar>
                <Icon name="book-open" size={50} color="white" >
                </Icon>
                <TextAvatar>
                    {textAvatar[0][0].toUpperCase()}   {textAvatar[1] ? textAvatar[1][0] : '   '}
                </TextAvatar>
            </Avatar>
            <NameContainer>
                <FullName>{fullname}</FullName>
                <Text style={{ paddingLeft: 30, color: '#fff' }}>{date.getHours() + ":" + date.getMinutes() + ' ' + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}</Text>
            </NameContainer>
        </Container>
    )
};

const NameContainer = styled.View`
    ali
`

const FullName = styled.Text`
  font-weight: bold;
  font-size: 30px;
  padding: 0px 20px 0px 30px;
  color: white;
  flex: 1;
  flex-wrap: wrap;

`;
const TextAvatar = styled.Text`
  font-weight: bold;
  fontSize: 22px;
  text-align: center;
  color: #FFFFFF;
  position: absolute;
  bottom: 15px;
  color: #1E90FF;
  text-shadow: 0px 0px 5px #000000;
`;

const Avatar = styled.View`
  align-items: center;
  background-color: transparent;
`;

const Container = styled.Pressable`
  align-items: center;
  flex-direction: row;
  borderRadius: 20px;
  borderColor: #F4FFFF;
  padding:10px 15px;
  margin:5px auto;
  background-color: rgba(0, 0, 0, 0.35);
  width: 80%;

`;

export default BookItem





