import { StyleSheet } from "react-native";
import { COLOR_STYLES } from "./constants/colors";
import { DIMENSIONS } from "./constants/dimensions";
import { FONT_STYLES } from "./constants/fonts";

export const headerStyles = StyleSheet.create({
    container: {
        height: DIMENSIONS.sizes.appHeader.height,
        paddingHorizontal: DIMENSIONS.spacings.header.paddings.paddingHorizontal,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLOR_STYLES.defaultTheme.colorPrimary,
        position: 'relative', // Needed for absolute positioning of title
    },
    icon: {
        width: DIMENSIONS.sizes.interactives.width,
        color: COLOR_STYLES.defaultTheme.colorInteractiveActive,
        zIndex: 1
    },
    title: {
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: FONT_STYLES.sizes.xl,
        fontWeight: FONT_STYLES.weight.boldest,
        color: COLOR_STYLES.defaultTheme.colorInteractiveActive,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1
    },
});