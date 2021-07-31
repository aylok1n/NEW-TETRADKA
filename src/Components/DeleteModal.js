import React from 'react'
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useDispatch } from 'react-redux'
import { deleteBook } from '../redux/booksSlice'
import styles from '../styles.js';

export default function EditModal({ modalVisibleDelete, setModalVisibleDelete, name }) {
    const dispatch = useDispatch()
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisibleDelete}
        >
            <Pressable style={styles.modalWindow} onPress={() => setModalVisibleDelete(!modalVisibleDelete)}>
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
            </Pressable>

        </Modal>
    )
}