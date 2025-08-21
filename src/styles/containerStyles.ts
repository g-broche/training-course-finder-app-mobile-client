import { Platform, StyleSheet } from "react-native";
import { COLOR_STYLES } from "./constants/colors";
import { DIMENSIONS } from "./constants/dimensions";

export const containerStyles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        width: '100%',
    },
    inlineContainer: {
        flex: 1,
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    headerContainer: {
        flex: 1,
        width: '100%',
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
        width: '100%',
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: DIMENSIONS.spacings.gaps.xl
    },
    announceDetail: {
        flex: 1,
        width: '100%',
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: DIMENSIONS.spacings.gaps.l
    },
    grid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: DIMENSIONS.spacings.gaps.l,
    },
    card: {
        flex: 1,
        borderRadius: DIMENSIONS.borderRadius.l,
        borderColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
        borderWidth: 1,
        minWidth: '48%',
        maxWidth: '48%',
        height: 'auto',
        padding: DIMENSIONS.spacings.gaps.l,
        gap: DIMENSIONS.spacings.gaps.s
    },
});