import React, { useState, useEffect } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InputForm } from '../../components/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsButton
} from './styles';

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Nome é obrigatório!'),
    amount: Yup
        .number()
        .typeError('Informe um valor númerico!')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório!')
})

export function Register() {
    const [isSelectedType, setIsSelectedType] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const transactionsKye = '@gofinance:transactions';
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    const navigation = useNavigation();
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });
    function handleSelectedType(type: 'positive' | 'negative') {
        setIsSelectedType(type)
    };
    function handleModalOpen() {
        setIsModalVisible(true)
    }
    function handleCloseModal() {
        setIsModalVisible(false)
    }

    async function handleRegister(form: FormData) {
        if (!isSelectedType) {
            return Alert.alert('Selecione o tipo da transação!');
        };
        if (category.key === 'category') {
            return Alert.alert('Selecione a categoria!');
        };
        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type : isSelectedType,
            category: category.key,
            date: new Date()
        };
        try {
            const transactions = await AsyncStorage.getItem(transactionsKye);
            const currentTransactions = transactions ? JSON.parse(transactions) : [];
            const transactionsFormatted = [
                ...currentTransactions,
                newTransaction
            ]
            await AsyncStorage.setItem(transactionsKye, JSON.stringify(transactionsFormatted))
            reset();
            setIsSelectedType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
            });
            navigation.navigate('Listagem')
        } catch (e) {
            console.log(e);
            Alert.alert("Não foi possivel cadastrar!")
        }
    };
    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric" error={errors.amount && errors.amount.message}
                        />
                        <TransactionsButton>
                            <TransactionTypeButton type="up" title="Income" isActive={isSelectedType === "positive"} onPress={() => handleSelectedType('positive')} />
                            <TransactionTypeButton type="down" title="Outcome" isActive={isSelectedType === "negative"} onPress={() => handleSelectedType('negative')} />
                        </TransactionsButton>
                        <CategorySelectButton title={category.name} onPress={handleModalOpen} />
                    </Fields>
                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>
                <Modal visible={isModalVisible}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}