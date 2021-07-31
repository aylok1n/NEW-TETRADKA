import React from 'react';
import styled from 'styled-components/native';
import { ImageBackground, View, Text, TouchableOpacity, TextInput, Modal, Vibration } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Feather';
import BookItem from '../Components/BookItem';
import { EmptyText } from '../Components/EmptyText.js';
import { useIsFocused } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBook, setCurrenId, renameBook } from '../redux/booksSlice'
import DeleteIcon from 'react-native-vector-icons/AntDesign';
import EditModal from '../Components/EditModal';
import DeleteModal from '../Components/DeleteModal';
import AddBookModal from '../Components/AddBookModal';
import RenameIcon from 'react-native-vector-icons/Feather';

const HomeScreen = ({ route, navigation }) => {

    const books = useSelector(state => state.books)
    const bookId = useSelector(state => state.currentId)
    const dispatch = useDispatch()
    const [modalVisibleEdit, setModalVisibleEdit] = React.useState(false)
    const [modalVisibleDelete, setModalVisibleDelete] = React.useState(false)
    const [modalVisibleAddBook, setModalVisibleAddBook] = React.useState(false)
    const [name, onChangeName] = React.useState('');

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
        });
    }, [navigation]);

    const onDelete = (id) => {
        dispatch(setCurrenId(id))
        dispatch(deleteBook())
    }

    const onRename = (id) => {
        dispatch(setCurrenId(id))
        setModalVisibleEdit(true)
    }

    return (
        <Container>
            <EditModal
                modalVisibleEdit={modalVisibleEdit}
                setModalVisibleEdit={setModalVisibleEdit}
                name={name}
                onChangeName={onChangeName} />
            <DeleteModal
                modalVisibleDelete={modalVisibleDelete}
                setModalVisibleDelete={setModalVisibleDelete}
                name={name}
            />
            <AddBookModal
                modalVisibleAddBook={modalVisibleAddBook}
                setModalVisibleAddBook={setModalVisibleAddBook}
            />

            <ImageBackground source={require(`../img/background.jpg`)} resizeMode="cover" style={styles.image}>
                {books.length === 0 ? <EmptyText>Добавьте альбом</EmptyText> : null}
                <SwipeListView
                    style={styles.scrollView}
                    data={books}
                    leftActivationValue={150}
                    rightActivationValue={-150}
                    useNativeDriver={true}
                    closeOnRowOpen={true}
                    closeOnScroll={true}
                    closeOnRowPress={true}
                    renderItem={(data) => (
                        <BookItem {...data.item} />
                    )}
                    renderHiddenItem={(data) => (
                        <View key={data.item.id}>
                        </View>
                    )}
                    onLeftActionStatusChange={(data) => {
                        if (data.isActivated) {
                            Vibration.vibrate(40);
                            onChangeName(books.find((i) => i.id == bookId).fullname)
                            setModalVisibleDelete(!modalVisibleDelete);
                        }
                    }}
                    onRightActionStatusChange={(data) => {
                        if (data.isActivated) {
                            Vibration.vibrate(40);
                            onChangeName(books.find((i) => i.id == bookId).fullname)
                            setModalVisibleEdit(!modalVisibleEdit);
                        }
                    }}
                />
                <PlusButton
                    onPress={() => { setModalVisibleAddBook(true); console.log(modalVisibleAddBook) }}
                    style={{ shadowColor: "#1E90FF;", elevation: 8, }}>
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