import React, { useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import InputTextMasked from "../components/InputTextMasked";
import useRequestApi from "../hooks/useRequestApi";
import { MainStackParamList } from "../types";
import { Button, Title } from "react-native-paper";
import DismissKeyboard from "../components/DissmissKeyboard";
import { validation } from "../util/Helper";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

type HomeProps = StackScreenProps<MainStackParamList, "Home">;

const HomeScreen: React.FC<HomeProps> = ({ navigation }) => {
  //Local state
  const [value, setValue] = useState("");
  const [cnpjNumber, setCnpjNumber] = useState("");

  //Hook Request
  const { loading, data, error, makeCall } = useRequestApi();

  /**
   * Effect that gets fired when data or error state is update.
   * Once update and if data has value navigate to the next screen
   * otherwise display and alert box with error message.
   */
  useEffect(() => {
    if (data) {
      navigation.push("Details", { title: cnpjNumber, cnpj: data });
    } else if (error) {
      alert(error.message);
    }
  }, [data, error]);

  /**
   * Handle change text updating local state
   * @param masked masked text from input
   * @param unmasked unmasked text from input
   */
  const handleChangeText = (masked: string, unmasked: string) => {
    setValue(masked);
    setCnpjNumber(unmasked);
  };

  /**
   *
   */
  const handleMakeCallApi = async () => {
    const hasError = validation(cnpjNumber);

    if (hasError.error) {
      alert(hasError.message);
    } else {
      makeCall(cnpjNumber);
    }
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar style="auto" />

        <View
          style={[
            Platform.OS === "ios" ? styles.shadowIos : styles.shadowAndroid,
            styles.card,
          ]}
        >
          <Title style={styles.title}>CNPJ Consultant</Title>
          <Image style={styles.logo} source={require("../assets/logo_.jpg")} />
          <Text>Please type the CNBJ number</Text>
          <InputTextMasked
            value={value}
            disabled={!loading}
            placeholder="xx.xxx.xxx/xxxx-xx"
            mask="xx.xxx.xxx/xxxx-xx"
            keyboardType="number-pad"
            onChangeValue={handleChangeText}
          />

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              icon="magnify"
              mode="contained"
              uppercase={false}
              loading={loading}
              disabled={loading}
              onPress={handleMakeCallApi}
            >
              Search
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
  },
  card: {
    backgroundColor: "#fff",
    paddingVertical: 60,
    marginHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  shadowIos: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  shadowAndroid: {
    elevation: 20,
    shadowColor: "#171717",
  },
  logo: {
    height: 180,
    width: 180,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#206db0",
    borderRadius: 5,
    width: "94%",
  },
});

export default HomeScreen;
