import React from 'react';
import { Container, Category, Icon } from './stytles';
interface CategorySelectProps  {
    title: string;
    onPress: () => void;
    testID: string;
}
export function CategorySelectButton({ title, onPress, testID }: CategorySelectProps) {
    return (
        <Container onPress={onPress} testID={testID}>
            <Category>{title}</Category>
            <Icon name='chevron-down' />
        </Container>
    );
}