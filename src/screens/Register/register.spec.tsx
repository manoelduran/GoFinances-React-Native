import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Register } from '.';
import theme from '../../global/styles/theme';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);

describe('Register Screen', () => {
    it('Should be open category modal when user click on button', async () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <Register />
            </NavigationContainer>
            ,
            {
                wrapper: Providers
            });
        const categoryModal = getByTestId('modal-category');
        const buttonCategory = getByTestId('button-category');
        fireEvent.press(buttonCategory);
        await waitFor(() => {
            expect(categoryModal.props.visible).toBeTruthy();
        });
    })
})