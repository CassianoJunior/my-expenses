import styled from 'styled-components/native';
import theme from '../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background.primary};
  padding: ${theme.spacings.large}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

export const Box = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${theme.spacings.extraLarge}px;
`;

export const Title = styled.Text`
  font-size: ${theme.sizes.regular}px;
  color: ${theme.colors.foreground};
`;

export const ButtonGroup = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin: ${theme.spacings.large}px 0;
`;

export const Span = styled.Text`
  color: ${theme.colors.brand.primary};
  font-weight: bold;
`;
