import React from 'react';
import { Container, UserInfo, Photo, User, UserGreeting, UserName, UserWrapper, Icon, LogoutButton } from './styles';
import { } from 'react-native';
import { useAuth } from '../../hooks/auth';

export function Header() {
    const {signOut, user} = useAuth()
    return (
        <Container>
            <UserWrapper>
                <UserInfo>
                    <Photo
                        source={{ uri: user.photo}}
                    />
                    <User>
                        <UserGreeting>Olá,</UserGreeting>
                        <UserName>{user.name}</UserName>
                    </User>
                </UserInfo>
                <LogoutButton onPress={signOut}>
                    <Icon name="power" />
                </LogoutButton>
            </UserWrapper>
        </Container>
    );
}