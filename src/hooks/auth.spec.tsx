import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { startAsync } from 'expo-auth-session';
import { mocked } from 'jest-mock';
import fetchMock from 'jest-fetch-mock'
import { AuthProvider, useAuth } from './auth';

const Providers: React.FC = ({ children }) => (
    <AuthProvider>
        {children}
    </AuthProvider>
);

jest.mock('expo-auth-session')
fetchMock.enableMocks()

describe('Auth Hook', () => {
    it('Signin with existed Google account', async () => {
        const googleMocked = mocked(startAsync as any)
        googleMocked.mockReturnValueOnce({
            type: 'success',
            params: {
                access_token: 'any_token'
            }
        })
        fetchMock.mockResponseOnce(
            JSON.stringify({
                id: 'any_id',
                email: 'manoel.duran@hotmail.com',
                name: 'Manoel',
                photo: 'any_photo.png'
            })
        )

        const { result } = renderHook(() => useAuth(),
            {
                wrapper: Providers
            }
        );
        await act(async () => await result.current.signInWithGoogle());
        expect(result.current.user.email).toBe('manoel.duran@hotmail.com')
    });

    it('user should not connect if cancel authentication with Google', async () => {

        const googleMocked = mocked(startAsync as any);
        googleMocked.mockReturnValueOnce({
            type: 'cancel',
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: Providers
        });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).not.toHaveProperty('id');
    });

    it('should be error signin with google not return type', async () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: Providers
        });

        try{
            await act(() => result.current.signInWithGoogle());
        } catch{
            expect(result.current.user).toEqual({});
        }
    });
})