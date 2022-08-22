import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserAuth from './screens/UserAuth';
import Search from './screens/Search';
import Info from './screens/Info';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group screenOptions={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Stack.Screen name='Auth' component={UserAuth} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}