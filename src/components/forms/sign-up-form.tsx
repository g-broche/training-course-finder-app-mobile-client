import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { checkDisplayNameAvailability } from "../../services/authService";
import { formStyles } from "../../styles/formStyles";
import ActionButton from "../shared/buttons/action-button";
import { FormGroupDisplayName } from "./form-group-display-name";
import { FormGroupInput } from "./form-group-input";

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
  firstName: yup
    .string()
    .required("First name is required")
    .min(1, "First name must be at least 1 characters")
    .max(30, "First name cannot exceed 30 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(1, "Last name must be at least 1 characters")
    .max(30, "Last name cannot exceed 30 characters"),
  displayName: yup
    .string()
    .required("Display name is required")
    .min(1, "Display name must be at least 1 characters")
    .max(30, "Display name cannot exceed 30 characters")
    .test(
      "displayName-availability",
      "This display name is already taken",
      async (value) => {
        if (!value || value.length === 0) return true;
        const isAvailable = await checkDisplayNameAvailability(value);
        return isAvailable;
      },
    ),
  email: yup
    .string()
    .email("Email must have a valid format")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email must have a valid format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  hasAcceptedGdpr: yup.bool().oneOf([true], "You must accept GDPR terms"),
});

export default function SignUpForm() {
  const { onRegister } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      hasAcceptedGdpr: false,
    },
  });

  const password = watch("password");

  useEffect(() => {
    if (errors.passwordConfirm) {
      trigger("passwordConfirm");
    }
  }, [password, errors.passwordConfirm, trigger]);

  const onSubmit = async (data: FormData) => {
    await onRegister(data);
  };

  return (
    <View style={formStyles.container}>
      <Text style={formStyles.headingModal}>Create your account</Text>
      <FormGroupInput
        name="firstName"
        label="First name"
        placeholder="Enter your first name"
        control={control}
        errors={errors}
      />
      <FormGroupInput
        name="lastName"
        label="Last name"
        placeholder="Enter your last name"
        control={control}
        errors={errors}
      />
      <FormGroupDisplayName
        name="displayName"
        label="Name displayed publicly"
        placeholder="Enter your display name"
        control={control}
        errors={errors}
      />
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
      <FormGroupInput
        name="passwordConfirm"
        label="Password confirmation"
        placeholder="Enter your password again"
        control={control}
        errors={errors}
        inputProps={{
          autoCapitalize: "none",
          secureTextEntry: true,
        }}
      />
      <View style={formStyles.formGroup}>
        <Controller
          name="hasAcceptedGdpr"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Pressable
              onPress={() => onChange(!value)}
              style={formStyles.checkboxContainer}
            >
              <View
                style={[
                  formStyles.checkbox,
                  value && formStyles.checkboxChecked,
                ]}
              />
              <Text style={formStyles.checkboxLabel}>
                I accept the GDPR terms
              </Text>
            </Pressable>
          )}
        />
        {errors.hasAcceptedGdpr && (
          <Text style={formStyles.errorText}>
            {errors.hasAcceptedGdpr.message}
          </Text>
        )}
      </View>
      <ActionButton
        title="Confirm"
        callback={handleSubmit(onSubmit)}
      ></ActionButton>
    </View>
  );
}
