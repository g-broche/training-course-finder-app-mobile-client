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
import { formStyles } from '../../styles/formStyles';
import ActionButton from '../buttons/action-button';

type LoginFormData = {
    email: string;
    password: string;
};

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

type InputField = {
    name: keyof LoginFormData;
} & Partial<TextInputProps>;

const inputs: InputField[] = [
    { name: 'email', placeholder: 'Email', keyboardType: 'email-address', autoCapitalize: 'none' },
    { name: 'password', placeholder: 'Password', secureTextEntry: true },
];

export default function SignInForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: LoginFormData) => {
        Alert.alert('Login Info', JSON.stringify(data, null, 2));
        // TODO: send data to backend API for authentication
    };

    return (
        <View style={formStyles.container}>
            <Text style={formStyles.headingModal}>Sign in</Text>
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
                                value={value}
                                {...props}
                            />
                            {errors[name] && (
                                <Text style={formStyles.errorText}>{errors[name]?.message}</Text>
                            )}
                        </View>
                    )}
                />
            ))}
            <ActionButton title='Sign in' callback={handleSubmit(onSubmit)}></ActionButton>
        </View>
    );
}