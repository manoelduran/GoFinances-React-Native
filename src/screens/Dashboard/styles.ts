import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { DataListProps } from './index';


export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})
  `
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;

`;

export const Transactions = styled.View`
flex: 1%;
padding: 0 24px;
margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
font-size:  ${RFValue(18)}px;
font-family: ${({ theme }) => theme.fonts.regular};
margin-bottom: 16px;
`;

export const TransactionList = styled(
  FlatList as new () => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false
})`

`;