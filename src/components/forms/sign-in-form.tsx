import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { formStyles } from "../../styles/formStyles";
import ActionButton from "../shared/buttons/action-button";
import { FormGroupInput } from "./form-group-input";

type LoginFormData = {
  email: string;
  password: string;
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email must have a valid format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function SignInForm() {
  const { onLogin } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema) as any,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await onLogin(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Login error", error.message || "Unknown error");
    }
  };

  return (
    <View style={formStyles.container}>
      <Text style={formStyles.headingModal}>Sign in</Text>
      <FormGroupInput
        name="email"
        label="Email"
        placeholder="Enter your email"
        control={control}
        errors={errors}
        inputProps={{
          autoCapitalize: "none",
          keyboardType: "email-address",
        }}
      />
      <FormGroupInput
        name="password"
        label="Password"
        placeholder="Enter your password"
        control={control}
        errors={errors}
        inputProps={{
          autoCapitalize: "none",
          secureTextEntry: true,
        }}
      />
      <ActionButton
        title="Sign in"
        callback={handleSubmit(onSubmit)}
      ></ActionButton>
    </View>
  );
}
