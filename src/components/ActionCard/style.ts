import styled from 'styled-components/native';
import theme from '../../theme';

export const Container = styled.TouchableOpacity`
  background-color: aliceblue;
  display: flex;
  height: ${theme.spacings.medium * 10}px;
  width: 100%;
  border-radius: ${theme.sizes.small}px;
  margin-bottom: ${theme.spacings.thin}px;
  position: relative;
  padding: ${theme.spacings.medium}px;
`;

export const Box = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const Title = styled.Text`
  font-size: ${theme.sizes.medium}px;
  font-weight: bold;
  color: #000;
`;
