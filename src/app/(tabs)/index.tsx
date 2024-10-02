// TabOneScreen.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PizzaBurger from '@/src/components/PizzaBurger';
import NewPage from '../../components/NewPage';
import { RootStackParamList } from '../../types'; // Import your types

const Stack = createStackNavigator<RootStackParamList>(); // Use the typed stack

const TabOneScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="PizzaBurger">
        <Stack.Screen 
          name="PizzaBurger" 
          component={PizzaBurger} 
          options={{ title: 'Menu', headerTitleAlign: 'center' }} // Center the title
        />
        <Stack.Screen 
          name="NewPage" 
          component={NewPage} 
          options={{ title: 'Details Page', headerTitleAlign: 'center' }} // Center the title
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TabOneScreen;
