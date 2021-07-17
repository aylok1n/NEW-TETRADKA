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
                <MenuOption onSelect={() => alert(`Save`)} text='Save'/>
                <MenuOption onSelect={() => alert(`Delete`)} text='Delete'/>
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
    triggerText: {
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
        letterSpacing: -1.9,
        transform: [{ rotateZ: '-90deg'}],
        padding: 30,
        paddingBottom: 20,
        paddingLeft: 30,
        marginTop: -20,
        zIndex: 999,
        borderRadius: 50,
    },
    TriggerTouchableComponent: TouchableOpacity,
};

const optionsStyles = {
    optionsContainer: {
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
        margin: 12,
    },
    optionText: {
      color: '#1E90FF',
      textAlign: 'center',
      fontSize: 24
    },
  };

export default PopUpMenu