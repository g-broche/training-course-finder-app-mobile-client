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
import { getToken, getUserFromToken, registerUser } from '../../services/authService';

type FormData = {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    hasAcceptedGdpr: boolean;
};

const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    displayName: yup.string().required('Display name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
    hasAcceptedGdpr: yup
        .bool()
        .oneOf([true], 'You must accept GDPR terms'),
});

type InputField = {
    name: keyof FormData;
} & Partial<TextInputProps>;

const inputs: InputField[] = [
    { name: 'firstName', placeholder: 'First Name' },
    { name: 'lastName', placeholder: 'Last Name' },
    { name: 'displayName', placeholder: 'Display Name' },
    { name: 'email', placeholder: 'Email', keyboardType: 'email-address', autoCapitalize: 'none' },
    { name: 'password', placeholder: 'Password', secureTextEntry: true },
    { name: 'passwordConfirm', placeholder: 'Confirm Password', secureTextEntry: true },
];

export default function SignUpForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            displayName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            hasAcceptedGdpr: false,
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            console.log("form data:", data)
            const token = await registerUser(data);
            console.log(getToken());
            console.log("user from token:", getUserFromToken());
        } catch (error) {
            console.log(error)
            Alert.alert('Sign up error', error);
        }

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
                name="hasAcceptedGdpr"
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
            {errors.hasAcceptedGdpr && (
                <Text style={formStyles.errorText}>{errors.hasAcceptedGdpr.message}</Text>
            )}

            <ActionButton title='Confirm' callback={handleSubmit(onSubmit)}></ActionButton>
        </View>
    );
}