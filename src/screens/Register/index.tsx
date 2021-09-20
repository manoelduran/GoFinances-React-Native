import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Input } from '../../components/Form/Input';
import { InputForm } from '../../components/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
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
})

export function Register() {
    const [isSelectedType, setIsSelectedType] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });
    function handleSelectedType(type: 'up' | 'down') {
        setIsSelectedType(type)
    };
    function handleModalOpen() {
        setIsModalVisible(true)
    }
    function handleCloseModal() {
        setIsModalVisible(false)
    }

    function handleRegister(form: FormData) {
        if (!isSelectedType) {
            return Alert.alert('Selecione o tipo da transação!');
        }
        if (category.key === 'category') {
            return Alert.alert('Selecione a categoria!');
        }
        const transaction = {
            name: form.name,
            amount: form.amount,
            isSelectedType,
            category: category.key
        }
        console.log(transaction)
    }

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
                            keyboardType="numeric"error={errors.amount && errors.amount.message}
                        />
                        <TransactionsButton>
                            <TransactionTypeButton type="up" title="Income" isActive={isSelectedType === "up"} onPress={() => handleSelectedType('up')} />
                            <TransactionTypeButton type="down" title="Outcome" isActive={isSelectedType === "down"} onPress={() => handleSelectedType('down')} />
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