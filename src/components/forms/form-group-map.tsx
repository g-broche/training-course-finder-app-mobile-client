import React from 'react';
import { View, Text } from 'react-native';
import { formStyles } from '../../styles/formStyles';
import { mediaStyles } from '../../styles/mediaStyles';
import { Control, FieldErrors, UseFormSetValue, useWatch, Path } from 'react-hook-form';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';

type FormGroupMapSelectorProps<T> = {
    control: Control<T>;
    errors: FieldErrors<T>;
    setValue: UseFormSetValue<T>;
    reverseGeocode: (lat: number, lng: number) => void;
    latField: Path<T>;
    lngField: Path<T>;
};

function hasFieldError<T>(errors: FieldErrors<T>, field: Path<T>) {
    return !!(errors as any)[field];
}

export function FormGroupMapSelector<T>({
    control,
    errors,
    setValue,
    reverseGeocode,
    latField,
    lngField
}: FormGroupMapSelectorProps<T>) {
    const latitude = useWatch({ control, name: latField }) as number | null;
    const longitude = useWatch({ control, name: lngField }) as number | null;

    const onMapPress = (e: MapPressEvent) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setValue(latField, latitude as any);
        setValue(lngField, longitude as any);
        reverseGeocode(latitude, longitude);
    };

    return (
        <View style={formStyles.formGroup}>
            <Text style={formStyles.label}>Select Location:</Text>
            <MapView
                style={mediaStyles.map}
                initialRegion={{
                    latitude: 48.8566,
                    longitude: 2.3522,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                onPress={onMapPress}
            >
                {latitude && longitude && (
                    <Marker coordinate={{ latitude, longitude }} />
                )}
            </MapView>

            {(hasFieldError(errors, latField) || hasFieldError(errors, lngField)) && (
                <Text style={formStyles.errorText}>Location is required</Text>
            )}
        </View>
    );
}