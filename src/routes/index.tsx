import { NavigationContainer } from '@react-navigation/native';
import { ActionProvider } from '../contexts/ActionContext';
import { AppRoutes } from './app.routes';

const Routes = () => {
  return (
    <NavigationContainer>
      <ActionProvider>
        <AppRoutes />
      </ActionProvider>
    </NavigationContainer>
  );
};

export { Routes };
