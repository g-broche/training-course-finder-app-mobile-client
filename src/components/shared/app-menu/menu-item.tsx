import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLOR_STYLES } from "../../../styles/constants/colors";

interface MenuItemProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  destructive?: boolean;
  iconSource?: ComponentProps<typeof Ionicons>["name"];
  iconSize?: number;
  iconColor?: string;
}

export default function MenuItem({
  label,
  onPress,
  style,
  destructive = false,
  iconSource,
  iconSize = 20,
  iconColor,
}: MenuItemProps) {
  const textColor = destructive
    ? COLOR_STYLES.defaultTheme.danger
    : COLOR_STYLES.defaultTheme.colorPrimary;
  const finalIconColor = iconColor || textColor;

  return (
    <TouchableOpacity
      style={[styles.menuItem, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemContent}>
        {iconSource && (
          <Ionicons
            name={iconSource}
            size={iconSize}
            color={finalIconColor}
            style={styles.icon}
          />
        )}
        <Text
          style={[styles.menuItemText, destructive && styles.destructiveText]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: COLOR_STYLES.defaultTheme.colorPrimary,
  },
  destructiveText: {
    color: COLOR_STYLES.defaultTheme.danger,
  },
});
