import React from 'react';
import {View, Text, Dimensions, TouchableOpacity, ImageBackground} from 'react-native'
import styled from 'styled-components/native';
import styles from '../styles.js';
import Dots from 'react-native-vector-icons/Entypo';
import {Menu, MenuOptions, MenuOption, MenuTrigger,renderers} from 'react-native-popup-menu';
  
const PopUpMenu = () => (
    <Container >
        <Menu renderer={renderers.SlideInMenu} >
            <MenuTrigger customStyles={triggerStyles} text='...'>
                {/* <Dots style={{zIndex: -9991}} name="dots-three-vertical" size={25} color="black"/> */}
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
                <ImageBackground source={require('./Screenshot_11.png')} resizeMode="stretch" style={{width:width}}>
                <MenuOption onSelect={() => alert(`Save`)} text='Save' />
                <MenuOption onSelect={() => alert(`Delete`)} text='Delete'/>
                </ImageBackground>
            </MenuOptions>
      </Menu>
    </Container>
);

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.9

const Container = styled.View`
    z-index: 9999;
    position: absolute;
    width: ${Math.round(width)}px;
    align-items: flex-end;
`;

const triggerStyles = {
    triggerWrapper: {
      padding: 30,
      paddingBottom: 0,
      paddingLeft: 10,
      marginTop: -30,
      zIndex: 909999999,
    },
    triggerText: {
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
        letterSpacing: -1.9,
        transform: [{ rotateZ: '-90deg'}]
      },
    TriggerTouchableComponent: TouchableOpacity,
};

const optionsStyles = {
    optionsContainer: {
    //   padding: 15,
      alignItems: 'center',
      borderTopStartRadius: 40,
      borderTopEndRadius: 40,
      elevation: 125,
    },
    optionsWrapper: {
        backgroundColor: 'transparent',
        width: width,
        borderRadius: 40,
    },
    optionWrapper: {
      margin: 10,
      borderRadius: 40,
    },
    optionTouchable: {
      activeOpacity: 70,
    },
    optionText: {
      color: '#1E90FF',
      textAlign: 'center',
      fontSize: 24
    },
  };

export default PopUpMenu