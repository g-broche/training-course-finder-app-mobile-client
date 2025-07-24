import { StyleSheet } from "react-native";
import { COLOR_STYLES } from "./constants/colors";
import { DIMENSIONS } from "./constants/dimensions";

export const containerStyles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: COLOR_STYLES.defaultTheme.colorPrimary,
    },
    main: {
        marginTop: DIMENSIONS.sizes.appHeader.height,
        paddingTop: DIMENSIONS.spacings.main.paddings.paddingTop,
        paddingBottom: DIMENSIONS.spacings.main.paddings.paddingBottom,
        paddingLeft: DIMENSIONS.spacings.main.paddings.paddingLeft,
        paddingRight: DIMENSIONS.spacings.main.paddings.paddingRight,
        backgroundColor: COLOR_STYLES.defaultTheme.colorSecondary,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: DIMENSIONS.spacings.gaps.xl
    },
});