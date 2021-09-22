import styled from "styled-components/native";
import {RectButton} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton).attrs({
    activeOpacity: 0.7
})`
background-color: ${({theme}) => theme.colors.shape};
border-radius: 5px;
padding: 18px 16px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;
export const Category = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
color: ${({theme}) => theme.colors.text};
`;
export const Icon = styled(Feather)`
color: ${({theme}) => theme.colors.text};
font-size: ${RFValue(20)}px;
`;