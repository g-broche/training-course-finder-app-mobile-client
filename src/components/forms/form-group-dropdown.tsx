import React from 'react';
import { View, Text } from 'react-native';
import { Controller, Control, FieldErrors, Path, PathValue } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { formStyles } from '../../styles/formStyles';
import { COLOR_STYLES } from '../../styles/constants/colors';

type PickerOption = {
    label: string;
    value: string | number | undefined;
};

type FormGroupDropdownProps<T, K extends Path<T> = Path<T>> = {
    name: K;
    label: string;
    placeholder: string;
    control: Control<T>;
    errors: FieldErrors<T>;
    options: PickerOption[];
} & (PathValue<T, K> extends string | number | undefined
    ? {}
    : { ERROR: 'Field must be string | number | undefined' });

export function FormGroupDropdown<T, K extends Path<T>>({
    name,
    label,
    placeholder,
    control,
    errors,
    options,
}: FormGroupDropdownProps<T, K>) {
    const error = errors[name as keyof typeof errors];

    return (
        <View style={formStyles.formGroup}>
            <Text style={formStyles.label}>{label}</Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Picker style={formStyles.dropdown} selectedValue={value} onValueChange={onChange}>
                        <Picker.Item label={placeholder} value={0} />
                        {options.map((opt) => (
                            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                        ))}
                    </Picker>
                )}
            />
            {error && (
                <Text style={formStyles.errorText}>
                    {(error as any)?.message}
                </Text>
            )}
        </View>
    );
}