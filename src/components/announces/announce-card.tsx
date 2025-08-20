import { View, Text, Image, Pressable } from "react-native";
import { Announce } from "../../types/dto";
import { mediaStyles } from "../../styles/mediaStyles";
import { isAnnounceTypeFound, isImageIncludedInAnnounce } from "../../utils/dtoUtil";
import { containerStyles } from "../../styles/containerStyles";
import { textStyles } from "../../styles/textStyles";
import { formatDate } from "../../utils/pipe";
import { Link } from "expo-router";

type Props = {
    announce: Announce;
};

const renderHeader = (announce: Announce) => {
    const content = isAnnounceTypeFound(announce)
        ? `Reported found : ${formatDate(announce.createdAt)}`
        : `Reported lost : ${formatDate(announce.createdAt)}`;
    return <Text style={textStyles.metadata}>{content}</Text>
}

const isAnnounceForFoundObject = (announce: Announce) => {
    return announce.type === "found";
}

const getRedirectionLinkPathForAnnounce = (announce: Announce) => {

    const path = isAnnounceForFoundObject(announce)
        ? `/announces/found/${announce.id}`
        : `/announces/lost/${announce.id}`;
    return path;
}

const renderPhotoOrDescription = (announce: Announce) => {
    return isImageIncludedInAnnounce(announce)
        ? (
            <Image
                source={{ uri: announce.photo }}
                style={mediaStyles.thumbnail}
                resizeMode="contain"
            />
        )
        : <Text style={textStyles.default}>{announce.description}</Text>;
};

export default function AnnounceCard({ announce }: Props) {
    return (
        <Link href={getRedirectionLinkPathForAnnounce(announce)} asChild>
            <Pressable style={containerStyles.card}>
                {renderHeader(announce)}
                <Text style={textStyles.default}>{announce.title}</Text>
                {renderPhotoOrDescription(announce)}
                <Text style={textStyles.default}>{`Location : ${announce.city} (${announce.country})`}</Text>
            </Pressable>
        </Link>
    );
}