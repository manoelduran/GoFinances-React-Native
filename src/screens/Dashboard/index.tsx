import React from 'react';
import { Header } from '../../components/Header'
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { Container, HighlightCards, Transactions, Title, TransactionList } from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            amount: "R$ 12.000,00",
            title: "Desenvolvimento de site",
            date: "13/04/2020",
            category: {
                name: "Vendas",
                icon: "dollar-sign"
            }
        },
        {
            id: '2',
            type: 'negative',
            amount: "R$ 59,00",
            title: "Hamburgueria Pizzy",
            date: "10/04/2020",
            category: {
                name: "Alimentação",
                icon: "coffee"
            }
        },
        {
            id: '3',
            type: 'negative',
            amount: "R$ 1.200,00",
            title: "Aluguel do apartamento",
            date: "22/03/2020",
            category: {
                name: "Casa",
                icon: "shopping-bag"
            }
        },
    ];
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

