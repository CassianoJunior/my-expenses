import styled from 'styled-components/native';
import theme from '../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background.primary};
  align-items: center;
  justify-content: center;
  padding: ${theme.spacings.regular}px;
`;
