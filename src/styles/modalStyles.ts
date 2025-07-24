import { StyleSheet } from "react-native";
import { COLOR_STYLES } from "./constants/colors";
import { DIMENSIONS } from "./constants/dimensions";
import { FONT_STYLES } from "./constants/fonts";

export const modalStyles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_STYLES.defaultTheme.colorSecondary,
        padding: 20,
        borderRadius: 10
    }
});