import React from 'react';
import {ScrollView, Button, SafeAreaView, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import styles from '../styles.js';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import PageItem from '../Components/PageItem.js'
import ImageView from 'react-native-image-view';
import PopUpMenu from '../Components/PopUpMenu.js';
import {EmptyText} from '../Components/EmptyText'



function BookScreen({route, navigation}) {
  	const {id, fullname, pages} = route.params;
  	const [isVisible, setIsVisible] = React.useState(false)
  	const [pageNumber, setPageNumber] = React.useState(0)
  	const [isVisibleHeader, setIsVisibleHeader] = React.useState(true)
	const images = []
  
  	React.useLayoutEffect(() => {
		const images = [];
		navigation.setOptions({
			headerTransparent: true,
			headerShown: isVisibleHeader,
			title: '',
		});
		pages.map((uri) => images.push({
			source: {uri : uri},
		}))
  	}, [navigation]);

	React.useEffect(() => {
		pages.map((uri) => images.push({
			source: {uri : uri},
		}))
	}, [])

  
	return (
	  	<Container>
			<ImageBackground source={require(`../img/background.jpg`)} resizeMode="cover" style={styles.image}>
			{pages != 0 ?
				<View>
					<ImageView
						images={images}
						animationType={'fade'}
						imageIndex={pageNumber}
						isVisible={isVisible}
						controls={{close: true ,next: false, prev: false}}
						onClose={() => {setIsVisible(false)}}
						isSwipeCloseEnabled={false}
					/>
					<PopUpMenu/>
					<ScrollView
							onScroll={() => setIsVisibleHeader(true)}
							style={styled.scrollView}>
							<FullName numberOfLines={1} ellipsizeMode='tail'>
								{fullname}
							</FullName>
							{pages.map((page, id,) => 
							<View  key={id}>
								<TouchableOpacity activeOpacity={0.95} onPress={() => {
									setIsVisible(true)
									setPageNumber(id)
								}}>
									<PageItem source={{uri: page}}/> 
								</TouchableOpacity>
							</View>)}
					</ScrollView>
				</View>
				:
				<EmptyText>Добавьте изображение</EmptyText>
			}

				<PencilButton 
					onPress={() => navigation.navigate('AddPageScreen', {
						id: id,
						fullname: fullname,
						pages: pages,
					})} 
					style ={{shadowColor: "#000",elevation: 10}}>
					<Icon name="pencil" size={30} color="white" />
				</PencilButton>
			</ImageBackground>
		</Container>
	)
} 


const BookName  = styled.Text `
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