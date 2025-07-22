import { StyleSheet } from "react-native";
import { COLOR_STYLES } from "./constants/colors";
import { FONT_STYLES } from "./constants/fonts";
import { DIMENSIONS } from "./constants/dimensions";

export const drawerStyles = StyleSheet.create({
    drawer: {
        flex: 1,
        paddingTop: DIMENSIONS.sizes.appHeader.height + DIMENSIONS.spacings.gaps.xl,
        gap: DIMENSIONS.spacings.gaps.xl,
        backgroundColor: COLOR_STYLES.defaultTheme.colorBackgroundSecondary
    },
    item: {
        paddingVertical: DIMENSIONS.spacings.buttons.paddingVertical,
        paddingHorizontal: DIMENSIONS.spacings.buttons.paddingHorizontal,
        // backgroundColor: '#fff',
    },
    // activeItem: {
    //     backgroundColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
    // },
    // inactiveItem: {
    //     backgroundColor: COLOR_STYLES.defaultTheme.colorInteractiveInactive,
    // },
    label: {
        fontSize: FONT_STYLES.sizes.l,
        color: COLOR_STYLES.defaultTheme.colorInteractiveInactive,
    },
    activeLabel: {
        fontWeight: FONT_STYLES.weight.boldest,
        color: COLOR_STYLES.defaultTheme.colorInteractiveActive,
    },
});