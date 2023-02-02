import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { Home } from '../screens/Home';
import { Test } from '../screens/Test';

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
            backgroundColor: colors.brand,
          },
        }}
      />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
};

export { AppRoutes };
