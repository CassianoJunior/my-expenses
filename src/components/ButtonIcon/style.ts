import styled from 'styled-components/native';

import theme from '../../theme';

export const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.brand.secondary};
  border-radius: ${theme.spacings.regular}px;
  padding: ${theme.spacings.regular}px;
  width: ${theme.spacings.extraLarge * 6}px;
`;
