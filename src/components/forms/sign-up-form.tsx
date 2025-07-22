import React from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
    TextInputProps,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { textStyles } from '../../styles/textStyles';
import { formStyles } from '../../styles/formStyles';
import ActionButton from '../buttons/action-button';

type FormData = {
    first_name: string;
    last_name: string;
    display_name: string;
    email: string;
    password: string;
    password_confirm: string; // Added confirm password
    has_accepted_gdpr: boolean;
};

const schema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    display_name: yup.string().required('Display name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    password_confirm: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
    has_accepted_gdpr: yup
        .bool()
        .oneOf([true], 'You must accept GDPR terms'),
});

type InputField = {
    name: keyof FormData;
} & Partial<TextInputProps>;

const inputs: InputField[] = [
    { name: 'first_name', placeholder: 'First Name' },
    { name: 'last_name', placeholder: 'Last Name' },
    { name: 'display_name', placeholder: 'Display Name' },
    { name: 'email', placeholder: 'Email', keyboardType: 'email-address', autoCapitalize: 'none' },
    { name: 'password', placeholder: 'Password', secureTextEntry: true },
    { name: 'password_confirm', placeholder: 'Confirm Password', secureTextEntry: true }, // Added here
];

export default function SignUpForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            first_name: '',
            last_name: '',
            display_name: '',
            email: '',
            password: '',
            password_confirm: '',
            has_accepted_gdpr: false,
        },
    });

    const onSubmit = (data: FormData) => {
        Alert.alert('Account Info', JSON.stringify(data, null, 2));
        // TODO: send data to backend API
    };

    return (
        <View style={formStyles.container}>
            <Text style={formStyles.headingModal}>Create your account</Text>
            {inputs.map(({ name, ...props }) => (
                <Controller
                    key={name}
                    name={name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <TextInput
                                style={formStyles.input}
                                onChangeText={onChange}
                                value={value as string}
                                {...props}
                            />
                            {errors[name] && (
                                <Text style={formStyles.errorText}>{errors[name]?.message}</Text>
                            )}
                        </View>
                    )}
                />
            ))}

            {/* GDPR Checkbox */}
            <Controller
                name="has_accepted_gdpr"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <Pressable
                        onPress={() => onChange(!value)}
                        style={formStyles.checkboxContainer}
                    >
                        <View style={[formStyles.checkbox, value && formStyles.checkboxChecked]} />
                        <Text style={formStyles.checkboxLabel}>I accept the GDPR terms</Text>
                    </Pressable>
                )}
            />
            {errors.has_accepted_gdpr && (
                <Text style={formStyles.errorText}>{errors.has_accepted_gdpr.message}</Text>
            )}

            <ActionButton title='Confirm' callback={handleSubmit(onSubmit)}></ActionButton>
        </View>
    );
}