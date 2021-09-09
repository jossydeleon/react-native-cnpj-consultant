import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackParamList } from "../types";
import HomeScreen from "../screens/Home";
import DetailsScreen from "../screens/Details";
import { capitalize } from "../util/Helper";

const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: "#206db0",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "CNPJ Consultant" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({ title: capitalize(route.params.cnpj.nome) })}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
