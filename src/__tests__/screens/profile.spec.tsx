import React from 'react';
import { render } from '@testing-library/react-native';
import { Profile } from '../../screens/Profile';

describe('Profile Screen', () => {
    it('should be check if show correctly user input name  placeholder ', () => {
        const { getByPlaceholderText } = render(<Profile />);
        const inputName = getByPlaceholderText('Nome');
        expect(inputName).toBeTruthy();
    });

    it('should be check if user data has been loaded  ', () => {
        const { getByTestId } = render(<Profile />);
        const inputName = getByTestId('input-name');
        const inputLastname = getByTestId('input-lastname')
        console.log(inputName.props.value)
        console.log(inputLastname.props.value)
        expect(inputName.props.value).toEqual('Manoel')
        expect(inputLastname.props.value).toEqual('Duran')
    });

    it('should be check if title render correctly', () => {
        const { getByTestId } = render(<Profile />);
        const textTitle = getByTestId('text-title');
        expect(textTitle.props.children).toContain('Perfil')
    });
});

