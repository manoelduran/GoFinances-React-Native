import React from 'react';
import { Container, Header, UserInfo, Photo, User, UserGreeting, UserName} from './styles';

export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserInfo>
                    <Photo source={{}} />
                    <User>
                        <UserGreeting>Olá,</UserGreeting>
                        <UserName>Manoel</UserName>
                    </User>
                </UserInfo>
            </Header>
        </Container>
    );
}

