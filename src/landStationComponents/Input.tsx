import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../landStationConstants/colors';

export const Input: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor={colors.dark.textSecondary}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.dark.card,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: colors.dark.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
});
