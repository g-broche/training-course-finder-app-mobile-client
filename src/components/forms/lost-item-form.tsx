import { yupResolver } from "@hookform/resolvers/yup";
import { endOfToday } from "date-fns";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { createNewLostAnnounce } from "../../services/announceService";
import { getAllCategories } from "../../services/categoryService";
import { formStyles } from "../../styles/formStyles";
import { LostItemRequest } from "../../types/request";
import ActionButton from "../buttons/action-button";
import { FormGroupArea } from "./form-group-area";
import { FormGroupDate } from "./form-group-date";
import { FormGroupDropdown } from "./form-group-dropdown";
import { FormGroupImageSelector } from "./form-group-image-selector";
import { FormGroupInput } from "./form-group-input";
import { FormGroupMapSelector } from "./form-group-map";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(50, "Title cannot exceed 50 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(30, "Description must be at least 30 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
  image: yup
    .mixed<File>()
    .nullable()
    .optional()
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true; // Optional field

      // Normalize common Android issue where type is just 'image' or missing
      const type = value.type;
      return type === "image" || type?.startsWith("image/");
    }),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  relevantDate: yup
    .date()
    .required()
    .max(endOfToday(), "Date cannot be in the future"),
  categoryId: yup.number().required(),
});

export default function LostItemForm() {
  const { authState } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LostItemRequest>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      title: "",
      description: "",
      image: null,
      latitude: null,
      longitude: null,
      city: "",
      country: "",
      relevantDate: new Date(),
      categoryId: undefined,
    },
  });

  const fetchCategories = async () => {
    try {
      const categories = await getAllCategories();
      setCategories(categories);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to load categories");
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Location access is needed to reverse geocode coordinates into city and country.",
        );
        return;
      }
      const [place] = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lng,
      });
      if (place) {
        setValue("city", place.city || "");
        setValue("country", place.country || "");
      }
    } catch (err) {
      console.log("Reverse geocode error:", err);
    }
  };

  const onSubmit = async (data) => {
    if (!authState?.token) {
      Alert.alert("Unauthorized", "You must be logged in to submit.");
      return;
    }

    let image = null;
    if (data.image) {
      image = {
        uri: data.image.uri,
        type: data.image.type,
        name: data.image.name,
      };
    }

    try {
      const newAnnounceResult = await createNewLostAnnounce(
        data,
        image,
        authState.token,
      );

      console.log(newAnnounceResult);
      Alert.alert("Success", "Lost item announce created successfully!");
      router.push("/announces/lost");
    } catch (err) {
      console.log("Full error:", err);
      console.log("Error response:", err.response?.data);
      console.log("Error status:", err.response?.status);
      Alert.alert("Error", "Submission failed.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={formStyles.container}>
      <FormGroupInput
        name="title"
        label="Announce title"
        placeholder="Enter announce title"
        control={control}
        errors={errors}
      />

      <FormGroupArea
        name="description"
        label="Description"
        placeholder="Enter informations related to the lost item"
        control={control}
        errors={errors}
      />

      <FormGroupDate
        name="relevantDate"
        control={control}
        errors={errors}
        ERROR={"Field must be a Date"}
      />

      <FormGroupImageSelector
        name="image"
        control={control}
        errors={errors}
        buttonTitle="Select photo of item (optional)"
      />

      <FormGroupDropdown
        name="categoryId"
        label="Category"
        placeholder="Select category..."
        control={control}
        errors={errors}
        options={categories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        }))}
      />

      <FormGroupMapSelector
        control={control}
        errors={errors}
        setValue={setValue}
        reverseGeocode={reverseGeocode}
        latField="latitude"
        lngField="longitude"
      />

      <ActionButton title="Submit" callback={handleSubmit(onSubmit)} />
    </View>
  );
}
