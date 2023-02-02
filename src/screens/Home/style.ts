import styled from 'styled-components/native';
import theme from '../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background.primary};
  justify-content: center;
  padding: ${theme.spacings.large}px;
`;

export const Box = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${theme.sizes.regular}px;
  color: ${theme.colors.foreground};
`;
