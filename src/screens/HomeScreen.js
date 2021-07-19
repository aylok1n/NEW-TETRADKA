import React from 'react';
import styled from 'styled-components/native';
import {ScrollView,Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Feather';
import BookItem from '../Components/BookItem';
import { EmptyText } from '../Components/EmptyText.js';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import {setBooks} from '../redux/booksSlice'


const HomeScreen = ({ navigation }) => {
	const [isClear,setIsClear] = React.useState(true)
  	const isFocused = useIsFocused()
  	const books = useSelector(state => state.books) 

  	React.useEffect(async () => {
		if(books != []){
			setIsClear(false)
		}
  	} , [isFocused])

	

	return (
		<Container>
			<ImageBackground source={require(`../img/background.jpg`)} resizeMode="cover" style={styles.image}>	
				{isClear ? <EmptyText>Добавьте первую книгу</EmptyText> : null}
				<ScrollView style={styles.scrollView}>
					{books.map((items) => <BookItem key={items.id} {...items} />)}
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