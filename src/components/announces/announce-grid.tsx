import { View } from "react-native";
import { containerStyles } from "../../styles/containerStyles";
import { Announce } from "../../types/dto";
import AnnounceCard from "./announce-card";

type Props = {
  announces: Announce[];
};

export default function AnnounceGrid({ announces }: Props) {
  if (!announces || !Array.isArray(announces)) {
    return null;
  }

  return (
    <View style={containerStyles.grid}>
      {announces.map((item, index) => (
        <AnnounceCard key={index} announce={item} />
      ))}
    </View>
  );
}
