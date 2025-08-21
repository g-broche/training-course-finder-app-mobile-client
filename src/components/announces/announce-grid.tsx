import { FlatList, View } from "react-native"
import { Announce } from "../../types/dto"
import AnnounceCard from "./announce-card"
import { containerStyles } from "../../styles/containerStyles"
import Paginator from "../paginator"
import { Link } from "expo-router"

type Props = {
    announces: Announce[]
}

export default function AnnounceGrid({ announces }: Props) {
    return (
        <View style={containerStyles.grid}>
            {announces.map((item, index) => (
                <AnnounceCard key={index} announce={item} />
            ))}
        </View>
    );
}