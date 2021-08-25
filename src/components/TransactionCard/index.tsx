import React from 'react'
import { Container, Title, Amount, Categories, Category, Icon, CategoryName, Date } from './styles';

interface CategoryProps {
    name: string;
    icon: string;
}

export interface TransactionCardProps {
        type: 'positive' | 'negative';
        title: string;
        amount: string;
        category: CategoryProps;
        date: string;
}

interface Props {
    data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount type={data.type}>
                {
                 data.type === 'positive' ? `${data.amount}` : `- ${data.amount}` 
                }
            </Amount>
            <Categories>
                <Category>
                    <Icon name={data.category.icon} />
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Categories>
        </Container>
    );
}