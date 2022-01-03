import styled, {css} from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
interface ContainerProps {
    active: boolean;
}
export const Container = styled(TextInput) <ContainerProps>`
width: 100% ;
font-size: ${RFValue(14)}px;
background-color: ${({ theme }) => theme.colors.shape};
font-family: ${({ theme }) => theme.fonts.regular};
color: ${({ theme }) => theme.colors.text_dark};
border-radius: 5px;
margin-bottom: 8px;
padding: 18px 16px;
${({active, theme}) => active && css` 
border-width: 3px;
border-color: ${theme.colors.attention};
`};
`;