import { StyleSheet } from "react-native";
import { DIMENSIONS } from "./constants/dimensions";

export const mediaStyles = StyleSheet.create({
    image: {
        marginVertical: DIMENSIONS.spacings.gaps.l,
        width: '100%',
        height: DIMENSIONS.sizes.media.height,
    },
    map: {
        marginVertical: DIMENSIONS.spacings.gaps.l,
        height: DIMENSIONS.sizes.media.height,
    },
});