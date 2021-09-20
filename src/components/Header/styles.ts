import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import {BorderlessButton} from 'react-native-gesture-handler';

export const Container = styled.View`
width: 100%;
height: ${RFPercentage(42)}px;
background-color: ${({ theme }) => theme.colors.primary};
flex-direction: row;
justify-content: center;
align-items: center;
`;

export const UserWrapper = styled.View`
width: 100%;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 0 24px;
margin-top: ${RFPercentage(-20)}px;
`;

export const UserInfo = styled.View`
flex-direction: row;
align-items: center;
`;

export const Photo = styled.Image`
width: ${RFValue(48)}px;
height: ${RFValue(48)}px;
border-radius: 10px;
`;

export const User = styled.View`
margin-left: 17px;
`;

export const UserGreeting = styled.Text`
color: ${({ theme }) => theme.colors.shape};
font-size: ${RFValue(18)}px;
font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
color: ${({ theme }) => theme.colors.shape};
font-size: ${RFValue(18)}px;
font-family: ${({ theme }) => theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)`

`;

export const Icon = styled(Feather)`
color: ${({ theme }) => theme.colors.secundary};
font-size: ${RFValue(24)}px;
`;

