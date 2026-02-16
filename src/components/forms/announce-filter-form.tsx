import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import * as yup from "yup";
import { formatFilterFromForm } from "../../services/announceService";
import { getAllCategories } from "../../services/categoryService";
import { containerStyles } from "../../styles/containerStyles";
import { formStyles } from "../../styles/formStyles";
import { textStyles } from "../../styles/textStyles";
import { SearchAnnounceFilter } from "../../types/request";
import ActionButton from "../buttons/action-button";
import { FormGroupDropdown } from "./form-group-dropdown";
import { FormGroupInput } from "./form-group-input";

interface AnnounceFilterFormProps {
  onFilterSubmit: (filter: SearchAnnounceFilter) => void;
}

const schema: yup.ObjectSchema<SearchAnnounceFilter> = yup.object({
  search: yup
    .string()
    .max(30, "Search query cannot exceed 30 characters")
    .optional(),
  categoryId: yup.number().optional(),
  city: yup
    .string()
    .max(100, "City name cannot exceed 100 characters")
    .optional(),
});

export default function AnnounceFilterForm({
  onFilterSubmit,
}: AnnounceFilterFormProps) {
  const [categories, setCategories] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchAnnounceFilter>({
    resolver: yupResolver(schema),
    defaultValues: {
      search: "",
      categoryId: undefined,
      city: "",
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

  const onSubmit = async (data: SearchAnnounceFilter) => {
    console.log("filters on click", data);
    const filter = formatFilterFromForm(data);
    onFilterSubmit(filter);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={containerStyles.viewContainer}>
      <Text style={textStyles.heading3}>Filters</Text>
      <View style={formStyles.container}>
        <FormGroupInput
          name="search"
          label="Title"
          placeholder="Enter partial title of announce"
          control={control}
          errors={errors}
        />

        <FormGroupInput
          name="city"
          label="City"
          placeholder="Enter city name"
          control={control}
          errors={errors}
        />

        <FormGroupDropdown
          name="categoryId"
          label="Category"
          placeholder="All categories"
          control={control}
          errors={errors}
          options={categories.map((cat) => ({
            label: cat.name,
            value: cat.id,
          }))}
        />

        <ActionButton title="Filter" callback={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
