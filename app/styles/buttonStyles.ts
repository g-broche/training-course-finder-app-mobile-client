import { StyleSheet } from "react-native";
import { COLOR_STYLES } from "./constants/colors";
import { DIMENSIONS } from "./constants/dimensions";

export const buttonStyles = StyleSheet.create({
    default: {
        backgroundColor: COLOR_STYLES.defaultTheme.colorBackgroundPrimary,
        padding: DIMENSIONS.spacings.buttons.paddings,
        borderRadius: DIMENSIONS.borderRadius.m,
        alignItems: 'center',
        minWidth: DIMENSIONS.spacings.buttons.minWidth
    }
});