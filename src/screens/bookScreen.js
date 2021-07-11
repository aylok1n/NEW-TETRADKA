import React from 'react';
import {ScrollView, Button, SafeAreaView, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import styles from '../styles.js';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import PageItem from '../Components/PageItem.js'
import ImageView from 'react-native-image-view';
import Dots from 'react-native-vector-icons/Entypo';
function BookScreen({route, navigation}) {
    // itemPages
  const {itemId, itemName, } = route.params;
  const Options = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false)
  const [pageNumber, setPageNumber] = React.useState(0)
  const [isVisibleHeader, setIsVisibleHeader] = React.useState(true)

  let itemPages = [
    "https://sun9-72.userapi.com/impg/UqE_3-N4liLHPJOTuL8FBLTQijHmU98PHGWA-g/svxHMhNREQM.jpg?size=1080x1440&quality=96&sign=634b2b439b12a20b7994a52c8bc8f82b&type=album",
    "https://sun9-8.userapi.com/impg/E9SZwKct28lZXRsaOGdHbfbJIBizPBEgOaTaug/lB5hh6wHcNE.jpg?size=810x1080&quality=96&sign=3a05007eef766b1ca1a3e7789d44eb12&type=album",
    "https://source.unsplash.com/user/erondu/1000x1200",
    "https://sun9-67.userapi.com/impg/C8lu90GGEpBvjsccdEZ79fGCNzpQCLVcnLUJRA/gi_sb_WPglw.jpg?size=810x1080&quality=96&sign=c8e4fdd54edf5d5f44624f0f1f61c11c&type=album",
    "https://sun9-57.userapi.com/impg/rVtafKKEOcymykLWo66_hC7aE0T9Fqa7oNlyxg/jCPsfWt_Y4Q.jpg?size=810x1080&quality=96&sign=762457809e0bee29d6094a5638ec66e0&type=album",
    "https://sun9-36.userapi.com/impg/efvc3SghYComccAGjev0oz-8s8I476dmzGz5rw/nN6xmTGJpYM.jpg?size=1200x1600&quality=96&sign=55f5791498244b30608171363ab0a3ba&type=album",
    "https://sun9-59.userapi.com/impg/NKdGicqK3kPl_h4Kf5gV3IjzB5sc1rLSOdb5Gw/qbTRqF3R2iQ.jpg?size=1920x1920&quality=96&sign=ac86a23fcf1f593f726ece3eaa34fc3b&type=album"
  ]
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerShown: isVisibleHeader,
      title: '',
      headerRight: () => (
        <Del  onPress={() => alert('Вот собственно, осталось только перегнать это все в пдф')} >
          <Dots name="dots-three-vertical" size={25} color="black" />
        </Del>
      ),
    });
  }, [navigation, Options]);

  const images = [];
  itemPages.map((uri) => images.push({
    source: {uri : uri},
  }))
  if(itemPages != 0){
    return (
      <Container >
        <ImageBackground source={require(`../img/background.jpg`)} resizeMode="cover" style={styles.image}>
            <ImageView
                images={images}
                animationType={'slide'}
                imageIndex={pageNumber}
                isVisible={isVisible}
                controls={{next: true, prev: true, close : false}}
                onClose={() => {setIsVisible(false)}}
                />
            <ScrollView
              onScrollAnimationEnd={() => console.log('dsfsdf')}
              onScroll={() => setIsVisibleHeader(true)}
              style={styled.scrollView}>
              <FullName numberOfLines={1} ellipsizeMode='tail' >
                {itemName}
              </FullName>
              {itemPages.map((page, id,) => <View>
                <TouchableOpacity activeOpacity={0.85} onPress={() => {
                    setIsVisible(true)
                    setPageNumber(id)
                }}>
                    <PageItem key={id} source={{uri: page}}/> 
                </TouchableOpacity>
            </View>)}
            </ScrollView>
            <PencilButton 
                onPress={() => navigation.navigate('AddPageScreen', {
                    Id: itemId,
                    Name: itemName,
                    Pages: itemPages,
                })} 
                style ={{shadowColor: "#000",elevation: 10}}>
                <Icon name="pencil" size={30} color="white" />
            </PencilButton>
        </ImageBackground>
      </Container>
      )
  }
  else {
    return (
      <Container>
          <ImageBackground source={require(`../img/background.jpg`)} resizeMode="cover" style={styles.image}>
                <PencilButton 
                    onPress={() => navigation.navigate('AddPageScreen', {
                    Id: itemId,
                    Name: itemName,
                    Pages: itemPages,
                    })} 
                style ={{shadowColor: "#000",elevation: 10,}}>
                <Icon name="pencil" size={30} color="white" />
                </PencilButton>
                <View>
                    <FullName numberOfLines={1} ellipsizeMode='tail' >{itemName}</FullName>
                </View>
                <EmptyText >Добавьте изображение</EmptyText>
            </ImageBackground>
      </Container>
    )
  }
}

const BookName  = styled.Text `
    font-Weight: 800;
    font-size: 28px;
    line-height: 30px;
`;
const Del = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    right:15px;
`;
const Container = styled.View`
    flex: 1; 
    align-items: center;
    height: 100%
`;

const EmptyText = styled.Text`
    font-Weight: 400;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
`

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