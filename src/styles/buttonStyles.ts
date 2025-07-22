import { StyleSheet } from "react-native";
import { COLOR_STYLES } from "./constants/colors";
import { DIMENSIONS } from "./constants/dimensions";

export const buttonStyles = StyleSheet.create({
    default: {
        borderRadius: DIMENSIONS.borderRadius.l,
        borderColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
        borderWidth: 1,
        paddingHorizontal: DIMENSIONS.spacings.buttons.paddingHorizontal,
        paddingVertical: DIMENSIONS.spacings.buttons.paddingVertical,
        backgroundColor: COLOR_STYLES.defaultTheme.colorBackgroundPrimary,
        alignItems: 'center',
    },
    icon: {
        backgroundColor: COLOR_STYLES.defaultTheme.colorBackgroundPrimary,
        alignItems: 'center',
        justifyContent: 'center',
    }
});