import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import { useDispatch } from 'react-redux'
import { renameBook } from '../redux/booksSlice'
import styles from '../styles.js';

export default function EditModal({ modalVisibleEdit, setModalVisibleEdit, name, onChangeName }) {
    const dispatch = useDispatch()
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisibleEdit}
        >
            <Pressable style={styles.modalWindow} onPress={() => setModalVisibleEdit(!modalVisibleEdit)}>
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
                            setModalVisibleEdit(!modalVisibleEdit);
                            dispatch(renameBook(name))
                        }
                        }
                    >
                        <Text style={{ fontSize: 18 }}>Coхранить</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>

        </Modal>
    )
}