import React, { useContext } from 'react';
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
import { loginUser } from '../../services/authService';
import { Credentials } from '../../types/interface';
import { AuthContext, useAuth } from '../../context/AuthContext';

type LoginFormData = {
    email: string;
    password: string;
};

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});
const authState = useContext(AuthContext)
console.log('AuthContext login:', authState.login);

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


    const onSubmit = async (data: LoginFormData) => {
        try {
            await authState.login(data);
        } catch (error) {
            console.error(error);
            Alert.alert('Login error', error.message || 'Unknown error');
        }
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