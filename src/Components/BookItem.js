import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux'
import { setCurrenId } from '../redux/booksSlice'
import RenameIcon from 'react-native-vector-icons/Feather';
import DeleteIcon from 'react-native-vector-icons/AntDesign';
import styles from '../styles';

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
        <TouchableOpacity style={styles.bookItem}>
            <DeleteIcon name="delete" size={30} color="red" style={styles.bookItemIcon} />
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
            <RenameIcon name="edit-2" size={30} color="black" style={styles.bookItemIcon} />
        </TouchableOpacity>
    )
};

const NameContainer = styled.View`
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





