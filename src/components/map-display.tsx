import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type MapDisplayProps = {
    latitude: string;
    longitude: string;
};

export default function MapDisplay({ latitude, longitude }: MapDisplayProps) {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.025,
                    longitudeDelta: 0.025,
                }}
            >
                <Marker
                    coordinate={{ latitude: lat, longitude: lng }}
                    title="Reported Location"
                    description={`Lat: ${lat}, Lng: ${lng}`}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 350,
        borderRadius: 8,
        overflow: "hidden",
    },
    map: {
        flex: 1,
    },
});