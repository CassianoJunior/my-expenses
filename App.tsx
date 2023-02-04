import FlashMessage from 'react-native-flash-message';
import { ThemeProvider } from 'styled-components/native';
import { Routes } from './src/routes';
import theme from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      <FlashMessage position="bottom" />
    </ThemeProvider>
  );
}
