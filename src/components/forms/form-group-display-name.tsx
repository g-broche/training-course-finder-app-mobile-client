import React, { JSX } from "react";
import { Control, Controller, FieldErrors, Path } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { useDisplayNameAvailability } from "../../hooks/user/useDisplayNameAvailability";
import { formStyles } from "../../styles/formStyles";

type FormGroupDisplayNameProps<T> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  inputProps?: TextInputProps;
};

/**
 * Display-name input integrated with react-hook-form `Controller`.
 *
 * @template T Form model type used by react-hook-form.
 * @param {FormGroupDisplayNameProps<T>} props Component props.
 * @param {Path<T>} props.name Type-safe field name/path in the form model.
 * @param {string} props.label Label displayed above the input.
 * @param {string} props.placeholder Placeholder text displayed when input is empty.
 * @param {Control<T>} props.control react-hook-form control instance for field binding.
 * @param {FieldErrors<T>} props.errors Validation errors object from react-hook-form.
 * @param {TextInputProps} [props.inputProps] Optional native `TextInput` props.
 * @returns {JSX.Element} A form group with input, availability feedback, and validation error text.
 */
export function FormGroupDisplayName<T>({
  name,
  label,
  placeholder,
  control,
  errors,
  inputProps,
}: FormGroupDisplayNameProps<T>): JSX.Element {
  const error = errors[name as keyof typeof errors];
  const [currentValue, setCurrentValue] = React.useState("");
  // Triggers async availability checks whenever user input changes with debouncer.
  const { isAvailable, isChecking } = useDisplayNameAvailability(currentValue);

  // Keeps feedback display rules in one place for readability and easier updates.
  const getAvailabilityMessage = () => {
    // Avoid showing success/error while request is pending or input is empty.
    if (isChecking || currentValue.length === 0) {
      return null;
    }

    if (isAvailable === true) {
      return <Text style={formStyles.okText}>✓ Display name is available</Text>;
    }
    if (isAvailable === false) {
      return (
        <Text style={formStyles.errorText}>
          ✗ Display name is already taken
        </Text>
      );
    }

    return null;
  };

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
            onChangeText={(text) => {
              // Sync react-hook-form state and local state used by availability hook.
              onChange(text);
              setCurrentValue(text);
            }}
            placeholder={placeholder || ""}
            {...inputProps}
          />
        )}
      />
      {getAvailabilityMessage()}
      {error && (
        <Text style={formStyles.errorText}>{(error as any)?.message}</Text>
      )}
    </View>
  );
}
