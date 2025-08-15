import React, { useEffect, useState } from 'react';
import { Button, Alert, View } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Location from 'expo-location';
import { getAllCategories } from '../../services/categoryService';
import { formStyles } from '../../styles/formStyles';
import { FormGroupInput } from './form-group-input';
import { FormGroupArea } from './form-group-area';
import { FormGroupDropdown } from './form-group-dropdown';
import { FormGroupDate } from './form-group-date';
import { FormGroupImageSelector } from './form-group-image-selector';
import { FormGroupMapSelector } from './form-group-map';
import { FoundItemRequest } from '../../types/request';
import { createNewFoundAnnounce } from '../../services/announceService';
import { useAuth } from '../../context/AuthContext';
import { endOfToday } from 'date-fns';


const schema = yup.object().shape({
    title: yup
        .string()
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters')
        .max(50, 'Title cannot exceed 50 characters'),
    description: yup
        .string()
        .required('Title is required')
        .min(30, 'Description must be at least 5 characters')
        .max(1000, 'Description cannot exceed 50 characters'),
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
    relevantDate: yup.date().required().max(endOfToday(), 'Date cannot be in the future'),
    categoryId: yup.number().required(),
});

export default function FoundItemForm() {
    const { authState } = useAuth();
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

        } catch (err) {
            console.log('Reverse geocode error:', err);
        }
    };


    const onSubmit = async (data) => {
        if (!authState?.token) {
            Alert.alert("Unauthorized", "You must be logged in to submit.");
            return;
        }
        const formData = new FormData();


        const image = {
            uri: data.image.uri,
            type: data.image.type,
            name: data.image.name,
        }

        try {
            const newAnnounceResult = await createNewFoundAnnounce(data, image, authState.token);

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
        <View style={formStyles.container}>
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
        </View>
    );
}