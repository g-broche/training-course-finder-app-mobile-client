import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  Path,
  PathValue,
} from "react-hook-form";
import { Alert, Image, Text, View } from "react-native";
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
    const currentPermission =
      await ImagePicker.getMediaLibraryPermissionsAsync();

    const permission = currentPermission.granted
      ? currentPermission
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access your media library is required to select an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
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
