import React, { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { CategorySelect } from '../../components/Form/CategorySelect';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsButton
} from './styles';



export function Register() {
    const [isSelectedType, setIsSelectedType] = useState('');
    function handleSelectedType(type: 'up' | 'down') {
            setIsSelectedType(type)
    };

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="Preço" />
                    <TransactionsButton>
                        <TransactionTypeButton type="up" title="Income" isActive={isSelectedType === "up"} onPress={() => handleSelectedType('up')} />
                        <TransactionTypeButton type="down" title="Outcome" isActive={isSelectedType === "down"} onPress={() => handleSelectedType('down')} />
                    </TransactionsButton>
                    <CategorySelect title="Categoria"/>
                </Fields>
                <Button title="Enviar" />
            </Form>

        </Container>
    );
}