import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../constants";

const LoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORS.pink} />
    <Text style={{paddingTop: 20, ...FONTS.body4}}>Loading</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});

export default LoadingScreen;