import { View, Text, Image } from "react-native";
import { Announce } from "../../types/dto";
import { mediaStyles } from "../../styles/mediaStyles";
import { isAnnounceTypeFound, isImageIncludedInAnnounce } from "../../utils/dtoUtil";
import { containerStyles } from "../../styles/containerStyles";
import { textStyles } from "../../styles/textStyles";
import { formatDate } from "../../utils/pipe";
import ViewTitle from "../view-title";
import MapDisplay from "../map-display";

type Props = {
    announce: Announce;
};

const renderHeader = (announce: Announce) => {
    const dateContent = isAnnounceTypeFound(announce)
        ? `Reported found : ${formatDate(announce.createdAt)}`
        : `Reported lost : ${formatDate(announce.createdAt)}`;
    return (
        <View style={{ alignItems: "flex-start", width: "100%" }}>
            <Text style={textStyles.metadata}>{dateContent}</Text>
            <Text style={textStyles.metadata}>Found in : {announce.city} {announce.country}</Text>
            <Text style={textStyles.metadata}>Posted by: {announce.author.displayName}</Text>
        </View>
    )
}

export default function AnnounceData({ announce }: Props) {
    console.log("rendering detail component")
    return (
        <View style={containerStyles.announceDetail}>
            {renderHeader(announce)}
            <ViewTitle title={announce.title} />
            {isImageIncludedInAnnounce(announce) && (
                <Image
                    source={{ uri: announce.photo }}
                    style={mediaStyles.image}
                    resizeMode="contain"
                />
            )}
            <Text style={textStyles.default}>{`Description : ${announce.description}`}</Text>
            <Text style={textStyles.default}>Location where found</Text>
            <MapDisplay latitude={announce.latitude} longitude={announce.longitude} />


        </View>
    );
}