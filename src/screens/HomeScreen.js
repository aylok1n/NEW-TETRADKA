import React from 'react';
import styled from 'styled-components/native';
import { ImageBackground, View, Text, TouchableOpacity, TextInput, Modal, Vibration } from 'react-native';
import { SwipeListView} from 'react-native-swipe-list-view';
import styles from '../styles.js';
import Icon from 'react-native-vector-icons/Feather';
import BookItem from '../Components/BookItem';
import { EmptyText } from '../Components/EmptyText.js';
import { useIsFocused } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBook, setCurrenId, renameBook } from '../redux/booksSlice'
import DeleteIcon from 'react-native-vector-icons/AntDesign';
import SortIcon from 'react-native-vector-icons/FontAwesome5';
import RenameIcon from 'react-native-vector-icons/Feather';

const HomeScreen = ({ route, navigation }) => {

    const books = useSelector(state => state.books)
    const bookId = useSelector(state => state.currentId)
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = React.useState(false)
    const [modalVisibleDelete, setModalVisibleDelete] = React.useState(false)
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
        setModalVisible(true)
    }

    return (
        <Container>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableOpacity style={styles.modalWindow} onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.modalView}>
                        <Text style={{ textAlign: 'center', fontSize: 24 }}>Редактировать</Text>
                        <TextInput
                            value={name}
                            style={styles.inputAddBook}
                            onChangeText={onChangeName}
                            placeholderTextColor="#FFFFFF"
                        />
                        <TouchableOpacity style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                dispatch(renameBook(name))
                            }
                            }
                        >
                            <Text style={{ fontSize: 18 }}>Coхранить</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleDelete}
            >
                <TouchableOpacity style={styles.modalWindow} onPress={() => setModalVisibleDelete(!modalVisibleDelete)}>
                    <View style={styles.modalView}>
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>Удалить {name}?</Text>
                        <View style={{ flexDirection: 'row', padding: 5 }}>
                            <TouchableOpacity style={styles.modalButton}
                                onPress={() => {
                                    setModalVisibleDelete(!modalVisibleDelete);
                                }
                                }
                            >
                                <Text style={{ fontSize: 18 }}>Отмена</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButtonDelete}
                                onPress={() => {
                                    setModalVisibleDelete(!modalVisibleDelete);
                                    dispatch(deleteBook())
                                }
                                }
                            >
                                <Text style={{ fontSize: 18 }}>Удалить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>

            </Modal>
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
                        <BookItemHidden key={data.item.id}>
                            <TouchableOpacity onPress={() => onDelete(data.item.id)}>
                                <DeleteIcon name="delete" size={30} color="red" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onRename(data.item.id)}>
                                <RenameIcon name="edit-2" size={30} color="black" />
                            </TouchableOpacity>
                        </BookItemHidden>
                    )}
                    onLeftActionStatusChange={(data) => {
                        if (data.isActivated) {
                            Vibration.vibrate(70);
                            onChangeName(books.find((i) => i.id == bookId).fullname)
                            setModalVisibleDelete(!modalVisibleDelete);
                        }
                    }}
                    onRightActionStatusChange={(data) => {
                        if (data.isActivated) {
                            Vibration.vibrate(70);
                            onChangeName(books.find((i) => i.id == bookId).fullname)
                            setModalVisible(!modalVisible);
                        }
                    }}
                />
                <PlusButton
                    onPress={() => navigation.navigate('AddBookScreen')}
                    style={{ shadowColor: "#1E90FF;", elevation: 8, }}>
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
    width: 80%
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

const Container = styled.View`
  flex: 1;
`;