import React from 'react';
import { Text, ScrollView, View, TouchableOpacity, ImageBackground, Pressable, Modal, Vibration, StyleSheet} from 'react-native';
import styles from '../styles.js';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import PageItem from '../Components/PageItem.js'
import ImageView from 'react-native-image-view';
import PopUpMenu from '../Components/PopUpMenu.js';
import { EmptyText } from '../Components/EmptyText'
import { useSelector, useDispatch } from 'react-redux';
import { deletePage } from '../redux/booksSlice';

function BookScreen({ navigation }) {
	const [isVisible, setIsVisible] = React.useState(false)
	const [modalVisible, setModalVisible] = React.useState(false)
	const [pageNumber, setPageNumber] = React.useState(0)
	const [images, setImages] = React.useState([])
	const id = useSelector(state => state.currentId)
	const fullname = useSelector(state => state.books.find((i) => i.id == state.currentId).fullname)
	const pages = useSelector(state => state.books.find((i) => i.id == state.currentId).pages)

	const dispatch = useDispatch()

	const mapPages = () => {
		let arr = []
		pages.map((uri) => arr.push({
			source: {
				uri: uri,
				title: pages.indexOf(uri) + '/' + pages.length,
				width: 612,
            	height: 792,
			},
		}))
		setImages(arr)
	}

	const onDelete = (page, id) => {
		Vibration.vibrate(40)
		setModalVisible(true)
		setPageNumber(id)
	}

	const renderFooter = () => {
		const style = StyleSheet.create({
			footer: {
				height: 50,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'rgba(0, 0, 0, 0.1)',
				paddingHorizontal: 10,
				paddingVertical: 5,
			},
			footerText: {
				fontSize: 16,
				color: '#FFF',
				textAlign: 'center',
			},
		});
        return (
            <View style={style.footer}>
                <Text style={style.footerText}>{(pageNumber + 1) + '/' + pages.length}</Text>
            </View>
        );
    }
	return (
		<Container>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
			>
				<Pressable style={styles.modalWindow} onPress={() => setModalVisible(!modalVisible)}>
					<View style={styles.modalView}>
						<Text style={{ textAlign: 'center', fontSize: 20 }}>Удалить это фото?</Text>
						<View style={{ flexDirection: 'row', padding: 5 }}>
							<TouchableOpacity style={styles.modalButton}
								onPress={() => {
									setModalVisible(!modalVisible);
								}}
							>
								<Text style={{ fontSize: 18 }}>Отмена</Text>
							</TouchableOpacity>

							<TouchableOpacity style={styles.modalButtonDelete}
								onPress={() => {
									setModalVisible(!modalVisible);
									dispatch(deletePage(pageNumber))
								}}
							>
								<Text style={{ fontSize: 18 }}>Удалить</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Pressable>
			</Modal>
			<ImageBackground source={require(`../img/background.jpg`)} resizeMode="cover" style={styles.image}>
				<PopUpMenu navigation={navigation} />
				<View>
					<ImageView
						images={images}
						imageIndex={pageNumber}
						isVisible={isVisible}
						onClose={() => { setIsVisible(false) }}
						isSwipeCloseEnabled={false}
						renderFooter={renderFooter}
						onImageChange={id => setPageNumber(id)}
					/>
					<ScrollView>
						<FullName numberOfLines={1} ellipsizeMode='tail'>{fullname}</FullName>
						{pages.map((page, id,) =>
							<View key={id}>
								<Pressable onPress={() => {
									mapPages()
									setIsVisible(true)
									setPageNumber(id)
								}}
									onLongPress={() => { onDelete(page, id) }}>
									<PageItem source={{ uri: page }} />
								</Pressable>
							</View>)}
					</ScrollView>
				</View>
				{pages.length === 0 ? <EmptyText>Добавьте изображение</EmptyText> : null}
			</ImageBackground>
		</Container>
	)
}


const BookName = styled.Text`
	font-Weight: 800;
	font-size: 28px;
	line-height: 30px;
`;
const HeaderPopUp = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	right:15px;
`;
const Container = styled.View`
	flex: 1; 
	align-items: center;
	height: 100%
  width: 100%
`;

const PencilButton = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	border-radius:50px;
	background-color: #1E90FF;
	width: 64px;
	height: 64px;
	position:absolute;
	right:15px;
	bottom:15px; 
`;


const FullName = styled.Text`
	color: #fff;
	font-weight: bold;
	font-size: 30px;
	margin: auto;
	text-align: left;
	width: 80%;
	padding-bottom: 20px;
	padding-top: 5px
`;
export default BookScreen;