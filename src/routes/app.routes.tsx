import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { Action } from '../screens/Action';
import { EditAction } from '../screens/EditAction';
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
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.brand.primary,
          },
        }}
      />
      <Stack.Screen
        name="EditAction"
        component={EditAction}
        options={{
          title: 'Edit action',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.brand.primary,
          },
        }}
      />
      <Stack.Screen
        name="Action"
        component={Action}
        options={({ route }) => ({
          title: route.params?.name,
          headerStyle: {
            backgroundColor: colors.brand.primary,
          },
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
};

export { AppRoutes };
