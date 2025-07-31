import { StyleSheet } from "react-native";
import { COLOR_STYLES } from "./constants/colors";
import { DIMENSIONS } from "./constants/dimensions";
import { FONT_STYLES } from "./constants/fonts";

export const formStyles = StyleSheet.create({
    container: {
        padding: DIMENSIONS.spacings.modal.padding,
        width: '100%',
        flexGrow: 1,
        gap: DIMENSIONS.spacings.gaps.xxl,
    },
    formGroup: {
        gap: DIMENSIONS.spacings.gaps.s,
    },
    formGroupMedia: {
        marginVertical: DIMENSIONS.spacings.gaps.xxl,
        gap: DIMENSIONS.spacings.gaps.s,
    },
    dropdown: {
        backgroundColor: COLOR_STYLES.defaultTheme.colorTertiary,
        borderRadius: 5,
    },
    headingModal: {
        color: COLOR_STYLES.defaultTheme.colorTertiary,
        fontWeight: FONT_STYLES.weight.boldest,
        fontSize: FONT_STYLES.sizes.xl,
        textAlign: "center"
    },
    label: {
        color: COLOR_STYLES.defaultTheme.colorTertiary,
        fontSize: FONT_STYLES.sizes.m,
        fontWeight: FONT_STYLES.weight.regular,
    },
    input: {
        borderWidth: 2,
        borderColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
        backgroundColor: COLOR_STYLES.defaultTheme.colorTertiary,
        padding: 8,
        borderRadius: 5,
    },
    inputArea: {
        borderWidth: 2,
        borderColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
        backgroundColor: COLOR_STYLES.defaultTheme.colorTertiary,
        padding: 8,
        borderRadius: 5,
        height: DIMENSIONS.sizes.input.area.height,
        textAlignVertical: 'top'
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
    formFieldButton: {
        borderRadius: 5,
        padding: 15,
        backgroundColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
    }
    ,
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