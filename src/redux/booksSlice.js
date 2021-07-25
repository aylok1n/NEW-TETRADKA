import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'

export const booksSlice = createSlice({
  name: 'reducer',
  initialState: {
    books : [],
    currentId : 0
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload
      AsyncStorage.setItem('books', JSON.stringify(state.books))
    },
    addBook: (state, action) => {
      state.books.push(action.payload)
      AsyncStorage.setItem('books', JSON.stringify(state.books))
    },
    addPage : (state, action) => {
      state.books.find((i) => i.id == state.currentId).pages.push(action.payload)
      AsyncStorage.setItem('books', JSON.stringify(state.books))
    },
    setCurrenId: (state, action) => {
      state.currentId = action.payload
    },
    deleteBook: (state) => {
      state.books = state.books.filter((i) => i.id !== state.currentId)
      console.log(state.currentId);
      state.currentId = 0
      AsyncStorage.setItem('books', JSON.stringify(state.books))
    },
    renameBook: (state, action) => {
      console.log(state.books)
      state.books.find((i) => i.id == state.currentId).fullname = action.payload
      console.log(state.books)
    }
  }
})

export const { setBooks, addBook, addPage, setCurrenId, deleteBook, renameBook } = booksSlice.actions

export default booksSlice.reducer