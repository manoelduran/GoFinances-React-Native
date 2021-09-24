import React, { useEffect, useState } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header, Title, Content } from './styles';
import { categories } from '../../utils/categories';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}
interface TotalByCategory {
    key: string;
    name: string;
    total: string;
    color: string;
}

export function Resume() {
    const [totalByCategories, setTotalByCategories] = useState<TotalByCategory[]>([]);
    const transactionsKye = '@gofinance:transactions';
    async function LoadTransactions() {
        const transactions = await AsyncStorage.getItem(transactionsKye);
        const transactionsFormatted = transactions ? JSON.parse(transactions) : [];
        const expensives = transactionsFormatted
            .filter((expensive: TransactionData) => expensive.type === 'negative');
        const totalByCategory: TotalByCategory[] = [];
        categories.forEach(category => {
            let categorySum = 0;
            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                };
            });
            if (categorySum > 0) {
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
                totalByCategory.push({
                    name: category.name,
                    total,
                    color: category.color,
                    key: category.key,
                });
            };
        });
        setTotalByCategories(totalByCategory);
    };

    useEffect(() => {
        LoadTransactions()
    }, []);
    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            <Content >
                {
                    totalByCategories.map(category => (
                        <HistoryCard key={category.key} title={category.name} amount={category.total} color={category.color} />
                    ))
                }
            </Content>
        </Container>
    )
}