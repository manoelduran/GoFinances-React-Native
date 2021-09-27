import React, { useEffect, useState } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header, Title, Content, ChartContainer, MonthSelect, MonthSelectButton, ButtonIcon, Month } from './styles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { VictoryPie } from 'victory-native';
import { useTheme } from 'styled-components';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';

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
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume() {
    const [totalByCategories, setTotalByCategories] = useState<TotalByCategory[]>([]);
    const theme = useTheme();
    const transactionsKye = '@gofinance:transactions';
    async function LoadTransactions() {
        const transactions = await AsyncStorage.getItem(transactionsKye);
        const transactionsFormatted = transactions ? JSON.parse(transactions) : [];
        const expensives = transactionsFormatted
            .filter((expensive: TransactionData) => expensive.type === 'negative');
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
    };

    useEffect(() => {
        LoadTransactions()
    }, []);
    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight(),
                }}
            >
                <MonthSelect>
                    <MonthSelectButton>
                        <ButtonIcon name="chevron-left"/>
                    </MonthSelectButton>
                    <Month>Maio</Month>
                    <MonthSelectButton>
                        <ButtonIcon  name="chevron-right"/>
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
        </Container>
    )
}