import MaskInput from 'react-native-mask-input';
import styled from 'styled-components/native';

import theme from '../../theme';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: ${theme.colors.background.secondary};
  padding: ${theme.spacings.regular}px;
`;

export const Input = styled(MaskInput).attrs({
  placeholderTextColor: 'white',
  cursorColor: theme.colors.brand.primary,
  color: 'white',
})`
  background-color: ${theme.colors.brand.secondary};
  border-radius: ${theme.spacings.regular}px;
  padding: ${theme.spacings.regular}px ${theme.spacings.medium}px;
  width: 100%;
  margin-bottom: ${theme.spacings.regular}px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${theme.colors.brand.primary};
  border-radius: ${theme.spacings.regular}px;
  padding: ${theme.spacings.regular}px;
  width: ${theme.spacings.extraLarge * 6}px;
  align-items: center;
  width: 100%;
`;
