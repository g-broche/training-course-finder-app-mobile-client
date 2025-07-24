import { StyleSheet } from "react-native";
import { COLOR_STYLES } from "./constants/colors";
import { DIMENSIONS } from "./constants/dimensions";

export const buttonStyles = StyleSheet.create({
    default: {
        borderRadius: DIMENSIONS.borderRadius.m,
        paddingHorizontal: DIMENSIONS.spacings.buttons.paddingHorizontal,
        paddingVertical: DIMENSIONS.spacings.buttons.paddingVertical,
        backgroundColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
        alignItems: 'center',
    },
    danger: {
        borderRadius: DIMENSIONS.borderRadius.m,
        paddingHorizontal: DIMENSIONS.spacings.buttons.paddingHorizontal,
        paddingVertical: DIMENSIONS.spacings.buttons.paddingVertical,
        backgroundColor: COLOR_STYLES.defaultTheme.danger,
        alignItems: 'center',
    },
    label: {
        color: COLOR_STYLES.defaultTheme.colorPrimary,
        textAlign: "center"
    },
    icon: {
        backgroundColor: COLOR_STYLES.defaultTheme.colorPrimary,
        alignItems: 'center',
        justifyContent: 'center',
    }
});