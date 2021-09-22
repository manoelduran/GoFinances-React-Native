import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../../components/Header'
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { Container, HighlightCards, Transactions, Title, TransactionList } from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const [data, setData] = useState<DataListProps[]>([]);
    async function getTransactions() {
        const transactionsKye = '@gofinance:transactions';
        const response = await AsyncStorage.getItem(transactionsKye);
        const transactions = response ? JSON.parse(response) : [];
        const transactionsFormatted: DataListProps[] = transactions.map((transaction: DataListProps) => {
            const amount = Number(transaction.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(transaction.date));
            return {
                id: transaction.id,
                amount,
                date,
                name: transaction.name,
                category: transaction.category,
                type: transaction.type
            }
        });
        setData(transactionsFormatted);
    };
    useEffect(() => {
        getTransactions()
    }, []);
    useFocusEffect(useCallback(() => {
        getTransactions()
    }, []))
    return (
        <Container>
            <Header />
            <HighlightCards >
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de abril" />
                <HighlightCard
                    type="down"
                    title="Saídas"
                    amount="R$ 1.259,00"
                    lastTransaction="Última saída dia 03 de abril" />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction="01 à 16 de abril" />
            </HighlightCards>
            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>

    );
}

