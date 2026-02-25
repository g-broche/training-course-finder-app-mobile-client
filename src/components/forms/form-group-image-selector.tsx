import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    Control,
    Controller,
    FieldErrors,
    Path,
    PathValue,
} from "react-hook-form";
import { Image, Text, View } from "react-native";
import { formStyles } from "../../styles/formStyles";
import { mediaStyles } from "../../styles/mediaStyles";
import ActionButton from "../shared/buttons/action-button";

type FormGroupImagePickerProps<T, K extends Path<T> = Path<T>> = {
  name: K;
  control: Control<T>;
  errors: FieldErrors<T>;
  buttonTitle: string;
} & (PathValue<T, K> extends File ? {} : { ERROR: "Field must be a File" });

export function FormGroupImageSelector<T, K extends Path<T> = Path<T>>({
  name,
  control,
  errors,
  buttonTitle,
}: FormGroupImagePickerProps<T, K>) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const error = errors[name as keyof typeof errors];

  const pickImage = async (onChange: (file: File) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];

      const file: File = {
        uri: asset.uri,
        name: asset.fileName ?? "photo.jpg",
        type: asset.mimeType ?? "image/jpeg",
      } as any;

      setImagePreview(asset.uri);
      onChange(file);
    }
  };

  return (
    <View style={formStyles.formGroupMedia}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <>
            <ActionButton
              title={buttonTitle}
              size="wide"
              callback={() => pickImage(onChange)}
            />
            {imagePreview && (
              <Image source={{ uri: imagePreview }} style={mediaStyles.image} />
            )}
            {error && (
              <Text style={formStyles.errorText}>
                {(error as any)?.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
}
