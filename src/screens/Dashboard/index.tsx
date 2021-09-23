import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { Header } from '../../components/Header'
import { HighlightCard } from '../../components/HighlightCard';
import { useTheme } from 'styled-components';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { Container, HighlightCards, Transactions, Title, TransactionList, LoadContainer } from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighLightProps {
    amount: string;
    lastTransaction: string;
}

interface HighLightData {
    entries: HighLightProps;
    expensive: HighLightProps;
    total: HighLightProps;
}

export function Dashboard() {
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighLightData] = useState<HighLightData>({} as HighLightData);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();

    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ) {
        const lastTransaction = new Date(
            Math.max.apply(Math, collection
                .filter(transaction => transaction.type === type)
                .map(transaction => new Date(transaction.date).getTime())))

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
            month: 'long'
        })}`
    }

    async function getTransactions() {
        const transactionsKye = '@gofinance:transactions';
        const response = await AsyncStorage.getItem(transactionsKye);
        const transactions = response ? JSON.parse(response) : [];
        let entriesTotal = 0;
        let expensiveTotal = 0;
        const transactionsFormatted: DataListProps[] = transactions.map((transaction: DataListProps) => {
            if (transaction.type === 'positive') {
                entriesTotal += Number(transaction.amount);
            } else {
                expensiveTotal += Number(transaction.amount);
            };
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
        setTransactions(transactionsFormatted);
        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
        const totalInterval = `01 a ${lastTransactionExpensives}`
        const total = entriesTotal - expensiveTotal;
        setHighLightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionEntries}`
            },
            expensive: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionExpensives}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        });
        setIsLoading(false);
    };
    useEffect(() => {
        getTransactions()
    }, []);
    useFocusEffect(useCallback(() => {
        getTransactions()
    }, []))
    return (
        <Container>

            {isLoading ?
                <LoadContainer>
                    <ActivityIndicator color={theme.colors.primary} size="large" />
                </LoadContainer>
                :
                <>
                    <Header />
                    <HighlightCards >
                        <HighlightCard
                            type="up"
                            title="Entradas"
                            amount={highlightData.entries.amount}
                            lastTransaction={highlightData.entries.lastTransaction}/>
                        <HighlightCard
                            type="down"
                            title="Saídas"
                            amount={highlightData.expensive.amount}
                            lastTransaction={highlightData.expensive.lastTransaction} />
                        <HighlightCard
                            type="total"
                            title="Total"
                            amount={highlightData.total.amount}
                            lastTransaction={highlightData.total.lastTransaction} />
                    </HighlightCards>
                    <Transactions>
                        <Title>Listagem</Title>
                        <TransactionList
                            data={transactions}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TransactionCard data={item} />}
                        />
                    </Transactions>
                </>
            }
        </Container>

    );
}

