import React from 'react'
import { View, SafeAreaView, TextInput, TouchableOpacity, Text, Alert, Modal, Pressable } from 'react-native';
import styles from '../styles.js';
import { addBook } from '../redux/booksSlice.js';
import { useDispatch } from 'react-redux';

export default function AddBookModal({ modalVisibleAddBook, setModalVisibleAddBook }) {
    const [text, onChangeText] = React.useState('');

    const dispatch = useDispatch()

    const AddBook = async (text) => {
        const newBook = {
            id: Date.now(),
            fullname: text,
            pages: [],
        }
        onChangeText('')
        dispatch(addBook(newBook))
        setModalVisibleAddBook(!modalVisibleAddBook)
    }
    return (
        <Modal
            visible={modalVisibleAddBook}
            animationType="fade"
            transparent={true}
        >
            <Pressable style={styles.modalWindow} onPress={() => setModalVisibleAddBook(!modalVisibleAddBook)}>
                <View style={styles.modalView}>
                    <SafeAreaView>
                        <TextInput
                            style={styles.inputAddBook}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Введите название книги"
                            placeholderTextColor="#FFFFFF"
                        />
                    </SafeAreaView>

                    <TouchableOpacity
                        style={styles.buttonAddBook}
                        onPress={() => {
                            if (text != '') {
                                AddBook(text)
                            }
                            else Alert.alert('', 'Введите название книги')
                        }}>
                        <Text style={styles.buttonAddBookText}>Добавить</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>

    )
}