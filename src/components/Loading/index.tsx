import { ActivityIndicator } from 'react-native';
import theme from '../../theme';

const Loading = () => (
  <ActivityIndicator size="large" color={theme.colors.brand.primary} />
);

export { Loading };
