import React from "react";
import { View, Text } from "react-native";
import { greet, lightDark } from "./getTime";
import { header } from "../globalStyle";
import { darkheader } from "../darkMode";

export default function Header() {
  return (
    <View style={lightDark() ? header.header : darkheader.header}>
      <Text style={lightDark() ? header.headerText : darkheader.headerText}>
        {greet()}
      </Text>
    </View>
  );
}
