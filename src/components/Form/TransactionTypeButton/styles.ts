import {RectButton } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
    type: 'up' | 'down';
}
interface ContainerProps {
    type: 'up' | 'down';
    isActive: boolean;
}

export const Container = styled.View<ContainerProps>`
width: 48%;

border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
border-color: ${({ theme }) => theme.colors.text};
border-radius: 5px;

${({ isActive, type }) => isActive && type === "up"&& css`
    background-color: ${({ theme }) => theme.colors.success_light};
`};
${({ isActive, type }) => isActive && type === "down" && css`
    background-color: ${({ theme }) => theme.colors.attention_light};
`};
`;

export const Button = styled(RectButton)`
flex-direction: row;
align-items: center;
justify-content: center;
padding: 18px 37px;
`

export const Icon = styled(Feather) <IconProps>`
font-size: ${RFValue(24)}px;
margin-right: 14px;
color: ${({ theme, type }) =>
        type === 'up' ? theme.colors.success : theme.colors.attention
    };

`;

export const Title = styled.Text`
font-family: ${({ theme }) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
color: ${({ theme }) => theme.colors.title}
`;