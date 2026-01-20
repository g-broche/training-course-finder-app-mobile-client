import React from "react";
import {
    Control,
    Controller,
    FieldErrors,
    Path,
    PathValue,
} from "react-hook-form";
import { Text, View } from "react-native";
import { formStyles } from "../../styles/formStyles";
import { Dropdown, DropdownOption } from "../shared/dropdown";

type FormGroupDropdownProps<T, K extends Path<T> = Path<T>> = {
  name: K;
  label: string;
  placeholder: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  options: DropdownOption[];
} & (PathValue<T, K> extends string | number | undefined
  ? {}
  : { ERROR: "Field must be string | number | undefined" });

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
          <Dropdown
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            style={formStyles.dropdown}
          />
        )}
      />
      {error && (
        <Text style={formStyles.errorText}>{(error as any)?.message}</Text>
      )}
    </View>
  );
}
