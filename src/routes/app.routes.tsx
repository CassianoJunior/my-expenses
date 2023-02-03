import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { Home } from '../screens/Home';
import { NewAction } from '../screens/NewAction';

const Stack = createStackNavigator();

const AppRoutes = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'My actions',
          headerStyle: {
            backgroundColor: colors.brand.primary,
          },
        }}
      />
      <Stack.Screen
        name="NewAction"
        component={NewAction}
        options={{
          title: 'Add new action',
          headerStyle: {
            backgroundColor: colors.brand.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export { AppRoutes };
