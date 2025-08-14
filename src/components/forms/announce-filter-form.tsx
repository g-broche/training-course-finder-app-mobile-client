import React, { useEffect, useState } from 'react';
import { Button, Alert, View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAllCategories } from '../../services/categoryService';
import { formStyles } from '../../styles/formStyles';
import { FormGroupInput } from './form-group-input';
import { FormGroupDropdown } from './form-group-dropdown';
import { SearchAnnounceFilter } from '../../types/request';
import { textStyles } from '../../styles/textStyles';
import { formatFilterFromForm } from '../../services/announceService';
import { containerStyles } from '../../styles/containerStyles';

interface AnnounceFilterFormProps {
    onFilterSubmit: (filter: SearchAnnounceFilter) => void;
}

const schema: yup.ObjectSchema<SearchAnnounceFilter> = yup.object({
    search: yup
        .string()
        .max(30, 'Search query cannot exceed 30 characters')
        .optional(),
    categoryId: yup.number().optional(),
});

export default function AnnounceFilterForm({ onFilterSubmit }: AnnounceFilterFormProps) {
    const [categories, setCategories] = useState([]);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SearchAnnounceFilter>({
        resolver: yupResolver(schema),
        defaultValues: {
            search: '',
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

    const onSubmit = async (data: SearchAnnounceFilter) => {
        const filter = formatFilterFromForm(data)
        onFilterSubmit(filter);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <View style={containerStyles.viewContainer}>
            <Text style={textStyles.heading3}>Filters</Text>
            <View style={formStyles.container}>
                <FormGroupInput
                    name="search"
                    label="Search by title"
                    placeholder='Enter partial title of announce'
                    control={control}
                    errors={errors}
                />

                <FormGroupDropdown
                    name="categoryId"
                    label="Category"
                    placeholder="Select optional category"
                    control={control}
                    errors={errors}
                    options={categories.map((cat) => ({
                        label: cat.name,
                        value: cat.id,
                    }))}
                />

                <Button title="Filter" onPress={handleSubmit(onSubmit)} />
            </View>
        </View>

    );
}