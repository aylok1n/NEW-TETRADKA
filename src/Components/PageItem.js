import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

let width = Dimensions.get('window').width
let height =  Dimensions.get('window').height

const PageItem = styled.Image`

justify-content: center;
width: ${width * 0.9};
height: ${height * 0.6};
borderBottomWidth: 3px ;
borderColor: #E0FFFF;
margin: 15px auto;
border-radius: 5px
`;

export default PageItem;