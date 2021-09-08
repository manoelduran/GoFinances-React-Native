import React from 'react';
import {Container, Text, Icon} from './stytles';
interface CategorySelectProps{
    title: string;
}
export function CategorySelect({title}: CategorySelectProps){
    return(
        <Container>
            <Text>{title}</Text>
            <Icon name='chevron-down'/>
        </Container>
    );
}