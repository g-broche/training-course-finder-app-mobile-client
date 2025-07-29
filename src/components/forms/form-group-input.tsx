import React from 'react';
import { Text, TextInput, View, TextInputProps } from 'react-native';
import { Controller, Control, FieldErrors, Path } from 'react-hook-form';
import { formStyles } from '../../styles/formStyles';

type FormGroupInputProps<T> = {
    name: Path<T>;
    label: string;
    placeholder: string;
    control: Control<T>;
    errors: FieldErrors<T>;
    inputProps?: TextInputProps;
};

export function FormGroupInput<T>({
    name,
    label,
    placeholder,
    control,
    errors,
    inputProps,
}: FormGroupInputProps<T>) {
    const error = errors[name as keyof typeof errors];
    return (
        <View style={formStyles.formGroup}>
            <Text style={formStyles.label}>{label}</Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={formStyles.input}
                        value={value as any}
                        onChangeText={onChange}
                        placeholder={placeholder || ''}
                        {...inputProps}
                    />
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