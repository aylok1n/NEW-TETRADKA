import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

let width = Dimensions.get('window').width * 0.9
let height =  Dimensions.get('window').height * 0.6

const PageItem = styled.Image`

justify-content: center;
width: ${Math.round(width)}px;
height: ${Math.round(height)}px;
borderBottomWidth: 3px ;
borderColor: #E0FFFF;
margin: 15px auto;
border-radius: 5px
`;

export default PageItem;