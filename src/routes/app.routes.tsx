import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { Test } from '../screens/Test';

const Stack = createStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
};

export { AppRoutes };
