import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PizzaBurger from "@/src/components/PizzaBurger";
import Restaurant from "@/src/components/Restaurant";
import NewPage from "../../components/NewPage";
import RestaurantDetail from "../../components/RestaurantDetailScreen"; // Import your RestaurantDetail component
import SplashScreens from "../../components/SplashScreens"; // Import SplashScreens
import JsonPage from "../../components/json"; // Import your JsonPage component
import { RootStackParamList } from "../../types"; // Import your types

const Stack = createStackNavigator<RootStackParamList>(); // Use the typed stack

const TabOneScreen = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasSeenSplash = await AsyncStorage.getItem("hasSeenSplash");
      setIsFirstLaunch(!hasSeenSplash);
    };
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null; // Render nothing while AsyncStorage is being checked
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName={isFirstLaunch ? "Splash" : "PizzaBurger"} // Dynamically set initial route
      >
        {isFirstLaunch && (
          <Stack.Screen
            name="Splash"
            component={SplashScreens}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="PizzaBurger"
          component={PizzaBurger}
          options={{
            title: "Foodie Moodie",
            headerTitleAlign: "center",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Restaurant"
          component={Restaurant}
          options={{
            title: "Foodie Moodie",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="RestaurantDetail" // Add the new RestaurantDetail screen
          component={RestaurantDetail}
          options={{ title: "Restaurant Details", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="NewPage"
          component={NewPage}
          options={{ title: "Details", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="JsonPage" // Add this new screen
          component={JsonPage}
          options={{ title: "Restaurant's Data", headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TabOneScreen;
