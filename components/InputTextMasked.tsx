import * as React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";

/**
 * Format string with custom mask using xxx
 * @param value string to transform
 * @param mask mask to applied
 * @returns
 */
function format(value: string, mask: string) {
  let i = 0;
  let lastIndexReplaced = -1;
  const textMasked = mask.replace(/x/g, (val, idx) => {
    if (i >= value.length) {
      return "x";
    }
    lastIndexReplaced = idx;
    return value[i++];
  });
  return textMasked.substring(0, lastIndexReplaced + 1);
}

export interface InputTeskMaskedProps extends TextInputProps {
  mask: string;
  onChangeValue: (masked: string, unmasked: string) => void;
  disabled?: boolean;
}

const InputTeskMasked: React.FC<InputTeskMaskedProps> = ({
  mask,
  disabled,
  onChangeValue,
  ...props
}) => {
  /**
   * Handle change text masking the value
   * @param text text to mask
   */
  const handleChange = (text: string) => {
    const unmasked = text.replace(/[^\d]/g, ""); //clean text removing others characters. return only digits
    const masked = format(unmasked, mask);
    onChangeValue(masked, unmasked);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        editable={disabled}
        onChangeText={handleChange}
        {...props}
      />
    </View>
  );
};

InputTeskMasked.defaultProps = {
  disabled: false,
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "row",
  },
  input: {
    padding: 10,
    borderColor: "#206db0",
    borderWidth: 0.5,
    borderRadius: 5,
    margin: 10,
    width: "100%",
    textAlign: "center",
  },
});

export default InputTeskMasked;
