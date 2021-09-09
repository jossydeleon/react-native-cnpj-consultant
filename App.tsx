import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import MainStackNavigation from "./navigation/MainStackNavigation";

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <StatusBar />
        <MainStackNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#206db0",
  },
});
