import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../landStationConstants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.dark.border,
    padding: 16,
  },
});
