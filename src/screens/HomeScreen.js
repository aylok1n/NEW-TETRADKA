import React from 'react';
import styled from 'styled-components/native';
import {ScrollView, ImageBackground, View, Text, TouchableOpacity, Alert, TextInput, Modal, Button} from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Feather';
import BookItem from '../Components/BookItem';
import { EmptyText } from '../Components/EmptyText.js';
import { useIsFocused } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import {setBooks, deleteBook, setCurrenId, renameBook} from '../redux/booksSlice'
import DeleteIcon from 'react-native-vector-icons/AntDesign';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import RenameIcon from 'react-native-vector-icons/Feather';


const HomeScreen = ({ route, navigation }) => {
	const [isClear,setIsClear] = React.useState(true)
	
  	const isFocused = useIsFocused()
  	const books = useSelector(state => state.books)
    const bookId = useSelector(state => state.currentId)  
	const dispatch = useDispatch()
	console.log(isClear)
    const [modalVisible,setModalVisible] = React.useState(false)
	const [name, onChangeName] = React.useState(bookId !== 0 ? books.find((i) => i.id == bookId).fullname : '');

  	React.useEffect(async () => {
		if(books === []){
			setIsClear(true)
		} else setIsClear(false)
  	} , [isFocused])
    
    const onDelete = (id) => {
        dispatch(setCurrenId(id))
        dispatch(deleteBook())
    }

    const onRename = (id) => {
        dispatch(setCurrenId(id))
        setModalVisible(true)
        
        // dispatch(renameBook("fgdg"))
    }

	return (
		<Container>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
				onTouchCancel={() => setModalVisible(!modalVisible)}
				on
				>
                <View style={styles.modalView}>
                    <TextInput
						value={name}
                        style={styles.inputAddBook}
                        onChangeText={onChangeName}
                        placeholderTextColor="#FFFFFF"
                    />
                    <Button title='Coхранить' onPress={() => {
						setModalVisible(!modalVisible);
						dispatch(renameBook(name))}
					}/>
					<CancelButton onPress={() => setModalVisible(!modalVisible)}>
						<CloseIcon name="close" size={25} color="red"/>
					</CancelButton>
                </View>
            </Modal>
			<ImageBackground source={require(`../img/background.jpg`)} resizeMode="cover" style={styles.image}>	
				{isClear ? <EmptyText>Добавьте альбом</EmptyText> : null}
                <SwipeListView
                    style={styles.scrollView}
                    data={books}
                    leftOpenValue={80}
                    rightOpenValue={-80}
                    useNativeDriver={true}
                    closeOnRowOpen={true}
                    closeOnScroll={true}
					closeOnRowPress={true}
                    renderItem={ (data) => (
                        <BookItem {...data.item} />
                    )}
                    renderHiddenItem={ (data) => (
                        <BookItemHidden>
                            <TouchableOpacity onPress={() => onDelete(data.item.id)}>
                                <DeleteIcon name="delete" size={25} color="red"/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onRename(data.item.id)}>
                                <RenameIcon name="edit-2" size={25} color="black"/>
                            </TouchableOpacity>
                        </BookItemHidden>
                    )}
                />
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

const BookItemHidden = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 20px;
    borderColor: #F4FFFF;
    padding:10px 25px;
    margin:5px auto;
    background-color: rgba(255, 255, 255, 0.5);
    width: 90%
`;

const PlusButton = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	border-radius:50px;
	background-color: transparent;
	position:absolute;
	right:25px;
	bottom:25px;
`;

const CancelButton = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	border-radius:50px;
	background-color: transparent;
	position:absolute;
	top:15px;
	right:15px;
`;

// const DeleteButton = styled.TouchableOpacity`
//     background-color: red;
//     flex:1;
//     height: 100%;
// `;

const Container = styled.View`
  flex: 1;
`;