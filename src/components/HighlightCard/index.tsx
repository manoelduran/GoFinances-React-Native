import React from 'react';
import {
    Container,
    Header,
    Title,
    Icon,
    Content,
    Amount,
    LastTransaction
} from './styles'
import { } from 'react-native';

interface HighlightCardProps {
    type: 'up' | 'down' | 'total'
    title: string;
    amount: string;
    lastTransaction: string;
}
const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export function HighlightCard({ amount, title, lastTransaction, type }: HighlightCardProps) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type} />
            </Header>
            <Content>
                <Amount type={type}>{amount}</Amount>
                <LastTransaction type={type}>{lastTransaction}</LastTransaction>
            </Content>
        </Container>
    );
}
