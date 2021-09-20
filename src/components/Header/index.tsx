import React from 'react';
import { Container, UserInfo, Photo, User, UserGreeting, UserName, UserWrapper, Icon, LogoutButton } from './styles';
import { } from 'react-native';

export function Header() {
    return (
        <Container>
            <UserWrapper>
                <UserInfo>
                    <Photo
                        source={{ uri: 'https://avatars.githubusercontent.com/u/59518313?v=4' }}
                    />
                    <User>
                        <UserGreeting>Olá,</UserGreeting>
                        <UserName>Manoel</UserName>
                    </User>
                </UserInfo>
                <LogoutButton onPress={() => {}}>
                    <Icon name="power" />
                </LogoutButton>
            </UserWrapper>
        </Container>
    );
}