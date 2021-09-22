import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import {Container, Category, Icon} from './stytles';
interface CategorySelectProps extends RectButtonProps{
    title: string;
    onPress: () => void;
}
export function CategorySelectButton({title, onPress}: CategorySelectProps){
    return(
        <Container onPress={onPress}>
            <Category>{title}</Category>
            <Icon name='chevron-down'/>
        </Container>
    );
}