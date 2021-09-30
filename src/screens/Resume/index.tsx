import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header, Title, Content, ChartContainer, MonthSelect, MonthSelectButton, ButtonIcon, Month, LoadContainer } from './styles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from 'styled-components';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
};
interface TotalByCategory {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
};

export function Resume() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<TotalByCategory[]>([]);
    const theme = useTheme();
    function handleDateChange(action: 'next' | 'prev') {
        if (action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    };
    const transactionsKye = '@gofinance:transactions';
    async function LoadTransactions() {
        setIsLoading(true);
        const transactions = await AsyncStorage.getItem(transactionsKye);
        const transactionsFormatted = transactions ? JSON.parse(transactions) : [];
        const expensives = transactionsFormatted
            .filter((expensive: TransactionData) =>
                expensive.type === 'negative' &&
                new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
                new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
            );
        const expensivesTotal = expensives.reduce((acumullator: number, expensive: TransactionData) => {
            return acumullator + Number(expensive.amount);
        }, 0);
        const totalByCategory: TotalByCategory[] = [];
        categories.forEach(category => {
            let categorySum = 0;
            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                };
            });
            if (categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`
                totalByCategory.push({
                    name: category.name,
                    total: categorySum,
                    totalFormatted,
                    color: category.color,
                    key: category.key,
                    percent,
                });
            };
        });
        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    };
    useFocusEffect(useCallback(() => {
        LoadTransactions()
    }, [selectedDate]))
    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            {isLoading ?
                <LoadContainer>
                    <ActivityIndicator color={theme.colors.primary} size="large" />
                </LoadContainer>
                :
                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight(),
                    }}
                >
                    <MonthSelect>
                        <MonthSelectButton onPress={() => handleDateChange('prev')}>
                            <ButtonIcon name="chevron-left" />
                        </MonthSelectButton>
                        <Month>{format(selectedDate, 'MMMM, yyyy ', { locale: ptBR })}</Month>
                        <MonthSelectButton onPress={() => handleDateChange('next')}>
                            <ButtonIcon name="chevron-right" />
                        </MonthSelectButton>
                    </MonthSelect>
                    <ChartContainer>
                        <VictoryPie
                            data={totalByCategories}
                            colorScale={totalByCategories.map(category => category.color)}
                            style={{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape,
                                }
                            }}
                            labelRadius={50}
                            x="percent"
                            y="total"
                        />
                    </ChartContainer>
                    {
                        totalByCategories.map(category => (
                            <HistoryCard key={category.key} title={category.name} amount={category.totalFormatted} color={category.color} />
                        ))
                    }
                </Content>
            }
        </Container>
    )
}