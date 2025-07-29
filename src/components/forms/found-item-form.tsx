import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Location from 'expo-location';
import axios from 'axios';
import { getAllCategories } from '../../services/categoryService';
import { formStyles } from '../../styles/formStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { containerStyles } from '../../styles/containerStyles';
import { FormGroupInput } from './form-group-input';
import { FormGroupArea } from './form-group-area';
import { FormGroupDropdown } from './form-group-dropdown';
import { FormGroupDate } from './form-group-date';
import { FormGroupImageSelector } from './form-group-image-selector';
import { FormGroupMapSelector } from './form-group-map';
import { FoundItemRequest } from '../../types/request';
import { createNewFoundAnnounce, testNewFoundAnnounceBody } from '../../services/announceService';

const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    image: yup
        .mixed<File>()
        .required('Photo is required')
        .test('fileType', 'Only image files are allowed', (value) => {
            if (!value) return false;

            // Normalize common Android issue where type is just 'image' or missing
            const type = value.type;

            return (
                type === 'image' ||
                type?.startsWith('image/')
            );
        }),
    latitude: yup.number().required(),
    longitude: yup.number().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    relevantDate: yup.date().required(),
    categoryId: yup.number().required(),
});

export default function FoundItemForm() {
    const [categories, setCategories] = useState([]);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FoundItemRequest>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            image: null,
            latitude: null,
            longitude: null,
            city: '',
            country: '',
            relevantDate: new Date(),
            categoryId: undefined,
        },
    });

    const fetchCategories = async () => {
        try {
            const categories = await getAllCategories();
            setCategories(categories);
        } catch (err) {
            console.log(err)
            Alert.alert('Error', 'Failed to load categories');
        }
    };

    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Location access is needed to reverse geocode coordinates into city and country.'
                );
                return;
            }

            const [place] = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
            if (place) {
                setValue('city', place.city || '');
                setValue('country', place.country || '');
            }

            console.log('>>> Reverse geocode : lat = ', lat);
            console.log('>>> Reverse geocode : lon = ', lng);
            console.log('>>> Reverse geocode : city = ', place.city);
            console.log('>>> Reverse geocode : country = ', place.country);
        } catch (err) {
            console.log('Reverse geocode error:', err);
        }
    };


    const onSubmit = async (data) => {
        const formData = new FormData();

        // Append text fields
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("latitude", String(data.latitude));
        formData.append("longitude", String(data.longitude));
        formData.append("city", data.city);
        formData.append("country", data.country);
        formData.append("relevantDate", data.relevantDate.toISOString().split('T')[0]);
        formData.append("categoryId", String(data.categoryId));

        const imageFile = {
            uri: data.image.uri,
            type: data.image.type || 'image/jpeg',
            name: data.image.name || 'image.jpg',
        };

        formData.append("image", imageFile);

        try {
            const newAnnounceResult = await createNewFoundAnnounce(formData);
            Alert.alert('Success', 'Item submitted successfully!');
            console.log(newAnnounceResult);
        } catch (err) {
            console.log('Full error:', err);
            console.log('Error response:', err.response?.data);
            console.log('Error status:', err.response?.status);
            Alert.alert('Error', 'Submission failed.');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <SafeAreaView style={containerStyles.viewContainer}>
            <ScrollView contentContainerStyle={formStyles.container}>
                <FormGroupInput
                    name="title"
                    label="Announce title"
                    placeholder='Enter announce title'
                    control={control}
                    errors={errors}
                />

                <FormGroupArea
                    name="description"
                    label="Description"
                    placeholder='Enter informations related to the item and its discovery'
                    control={control}
                    errors={errors}
                />

                <FormGroupDate
                    name="relevantDate"
                    control={control}
                    errors={errors}
                    ERROR={'Field must be a Date'}
                />

                <FormGroupImageSelector
                    name="image"
                    control={control}
                    errors={errors}
                    buttonTitle="Select photo of item"
                />

                <FormGroupDropdown
                    name="categoryId"
                    label="Category"
                    placeholder="Select category..."
                    control={control}
                    errors={errors}
                    options={categories.map((cat) => ({
                        label: cat.name,
                        value: cat.id,
                    }))}
                />

                <FormGroupMapSelector
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    reverseGeocode={reverseGeocode}
                    latField="latitude"
                    lngField="longitude"
                />

                <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            </ScrollView>
        </SafeAreaView>
    );
}