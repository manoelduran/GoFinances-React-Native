import React from 'react';
import { RectButtonProperties} from 'react-native-gesture-handler'
import { Container, Icon, Title, Button } from './styles';

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface TransactionTypeButtonProps extends RectButtonProperties {
    type: 'up' | 'down';
    title: string;
    isActive : boolean;
}

export function TransactionTypeButton({ type, title, isActive, ...rest }: TransactionTypeButtonProps) {
    return (
        <Container isActive={isActive} type={type}  >
            <Button {...rest}>
            <Icon name={icons[type]} type={type} />
            <Title>{title}</Title>
            </Button>
        </Container>
    );
}