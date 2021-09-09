import * as React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const DismissKeyboard: React.FC = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
