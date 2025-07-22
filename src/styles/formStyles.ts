import { StyleSheet } from "react-native";
import { COLOR_STYLES } from "./constants/colors";
import { DIMENSIONS } from "./constants/dimensions";
import { FONT_STYLES } from "./constants/fonts";
import { textStyles } from "./textStyles";

export const formStyles = StyleSheet.create({
    container: {
        padding: DIMENSIONS.spacings.modal.padding,
        gap: DIMENSIONS.spacings.gaps.xxl,
    },
    headingModal: {
        color: COLOR_STYLES.defaultTheme.colorTertiary,
        fontWeight: FONT_STYLES.weight.boldest,
        fontSize: FONT_STYLES.sizes.xl,
        textAlign: "center"
    },
    input: {
        borderWidth: 2,
        borderColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
        backgroundColor: "white",
        padding: 8,
        borderRadius: 5,
    },
    errorText: {
        color: COLOR_STYLES.defaultTheme.danger,
        marginTop: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
        marginRight: 10,
        borderRadius: 4,
    },
    checkboxChecked: {
        backgroundColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
        borderColor: COLOR_STYLES.defaultTheme.colorPrimary,
    },
    checkboxLabel: {
        fontSize: FONT_STYLES.sizes.m,
        color: COLOR_STYLES.defaultTheme.colorTertiary
    },
    submitButton: {
        marginTop: DIMENSIONS.spacings.gaps.xl,
        borderRadius: 5,
        padding: 15,
        backgroundColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
    },
    submitText: {
        color: COLOR_STYLES.defaultTheme.colorPrimary,
        fontWeight: FONT_STYLES.weight.boldest,
        textAlign: 'center',
    },
});