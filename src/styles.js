import { StyleSheet, Dimensions } from 'react-native';

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  scrollView: {
    marginTop: 90,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  image: {
    height: height - 20,
    width: width
  },
  inputAddBook: {
    height: 40,
    borderRadius: 5,
    margin: 12,
    borderWidth: 2,
    color: "#FFFFFF",
    backgroundColor: 'rgba(0,0,0,0.25)',
    textAlign: 'center',
    width: 300,
    fontSize: 16,
  },
  buttonAddBook: {
    width: 150,
    height: 40,
    backgroundColor: 'rgba(	30, 144, 255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonAddBookText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  viewAddBook: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150,
  },
  deleteText: {
    color: '#FF0000',
    textAlign: 'center',
    fontSize: 20,
  },
  modalWindow: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width : width * 0.85,
    margin: 20,
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalButton: {
    padding: 5,
    paddingHorizontal: 15,
    margin: 10,
    marginBottom: 0,
    backgroundColor: 'rgba(	30, 144, 255,0.95)',
    borderRadius: 10
  },
  modalButtonDelete: {
    padding: 5,
    paddingHorizontal: 15,
    margin: 10,
    marginBottom: 0,
    backgroundColor: 'rgba(	255, 30, 30, 0.8)',
    borderRadius: 10
  },
  sortView: {
    textAlign: 'center',
    width: '90%',
    position: 'absolute',
    right: 25,
    top: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  bookItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    alignItems: 'center'
  },
  bookItemIcon: {
    marginHorizontal: -60
  }
});


export default styles