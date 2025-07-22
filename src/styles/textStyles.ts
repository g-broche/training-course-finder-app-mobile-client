import { StyleSheet } from "react-native";
import { COLOR_STYLES } from "./constants/colors";
import { FONT_STYLES } from "./constants/fonts";

export const textStyles = StyleSheet.create({
    heading1: {
        color: COLOR_STYLES.defaultTheme.colorTertiary,
        fontWeight: FONT_STYLES.weight.boldest,
        fontSize: FONT_STYLES.sizes.xxl
    },
    heading2: {
        color: COLOR_STYLES.defaultTheme.colorTertiary,
        fontWeight: FONT_STYLES.weight.boldest,
        fontSize: FONT_STYLES.sizes.xl
    },
    heading3: {
        color: COLOR_STYLES.defaultTheme.colorTertiary,
        fontWeight: FONT_STYLES.weight.bolder,
        fontSize: FONT_STYLES.sizes.l
    },
    interactiveActive: {
        color: COLOR_STYLES.defaultTheme.colorInteractiveActive,
        fontWeight: FONT_STYLES.weight.bolder,
        fontSize: FONT_STYLES.sizes.l
    },
    interactiveInactive: {
        color: COLOR_STYLES.defaultTheme.colorInteractiveInactive,
        fontWeight: FONT_STYLES.weight.bolder,
        fontSize: FONT_STYLES.sizes.l
    },
    error: {
        color: COLOR_STYLES.defaultTheme.danger,
        fontWeight: FONT_STYLES.weight.regular,
        fontSize: FONT_STYLES.sizes.m
    },
    default: {
        color: COLOR_STYLES.defaultTheme.colorTertiary,
        fontWeight: FONT_STYLES.weight.regular,
        fontSize: FONT_STYLES.sizes.m
    }
});