import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
    Control,
    Controller,
    FieldErrors,
    Path,
    PathValue,
} from "react-hook-form";
import { Text, View } from "react-native";
import { formStyles } from "../../styles/formStyles";
import ActionButton from "../shared/buttons/action-button";

type FormGroupDateProps<T, K extends Path<T> = Path<T>> = {
  name: K;
  control: Control<T>;
  errors: FieldErrors<T>;
} & (PathValue<T, K> extends Date ? {} : { ERROR: "Field must be a Date" });

export function FormGroupDate<T>({
  name,
  control,
  errors,
}: FormGroupDateProps<T>) {
  const error = errors[name as keyof typeof errors];
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={formStyles.formGroup}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => {
          const dateValue = value as unknown as Date;

          return (
            <View style={formStyles.formGroup}>
              <ActionButton
                title="Select date when found"
                callback={() => setShowDatePicker(true)}
              />
              <Text style={formStyles.label}>
                Selected date: {dateValue?.toDateString()}
              </Text>
              {showDatePicker && (
                <DateTimePicker
                  value={dateValue || new Date()}
                  mode="date"
                  display="default"
                  onChange={(_, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) onChange(selectedDate);
                  }}
                />
              )}
            </View>
          );
        }}
      />
      {error && (
        <Text style={formStyles.errorText}>{(error as any)?.message}</Text>
      )}
    </View>
  );
}
