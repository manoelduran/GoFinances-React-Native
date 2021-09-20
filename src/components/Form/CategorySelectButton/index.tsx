import React from 'react';
import {Container, Text, Icon} from './stytles';
interface CategorySelectProps{
    title: string;
    onPress: () => void;
}
export function CategorySelectButton({title, onPress}: CategorySelectProps){
    return(
        <Container onPress={onPress}>
            <Text>{title}</Text>
            <Icon name='chevron-down'/>
        </Container>
    );
}