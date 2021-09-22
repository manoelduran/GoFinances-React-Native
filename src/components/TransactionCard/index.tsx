import React from 'react'
import { categories } from '../../utils/categories';
import { Container, Title, Amount, Categories, Category, Icon, CategoryName, Date } from './styles';


export interface TransactionCardProps {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface Props {
    data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
    const [category] = categories.filter(
        categorie => categorie.key === data.category
    );
    return (
        <Container>
            <Title>{data.name}</Title>
            <Amount type={data.type}>
                {
                    data.type === 'positive' ? `${data.amount}` : `- ${data.amount}`
                }
            </Amount>
            <Categories>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Categories>
        </Container>
    );
}