import React, { useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLOR_STYLES } from "../../../styles/constants/colors";
import { DIMENSIONS } from "../../../styles/constants/dimensions";

export type DropdownOption = {
  label: string;
  value: string | number | undefined;
};

type DropdownProps = {
  value?: any;
  onChange: (value: any) => void;
  options: DropdownOption[];
  placeholder: string;
  style?: any;
};

export function Dropdown({
  value,
  onChange,
  options,
  placeholder,
  style,
}: DropdownProps) {
  const [isVisible, setIsVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (selectedValue: string | number | undefined) => {
    onChange(selectedValue);
    setIsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.dropdown, style]}
        onPress={() => setIsVisible(true)}
      >
        <Text
          style={[
            styles.dropdownText,
            !selectedOption && styles.placeholderText,
          ]}
        >
          {displayText}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.value === value && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLOR_STYLES.defaultTheme.colorSecondary,
    borderWidth: 1,
    borderColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
    borderRadius: DIMENSIONS.borderRadius.m,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
  },
  dropdownText: {
    fontSize: 16,
    flex: 1,
  },
  placeholderText: {
    opacity: 0.6,
  },
  arrow: {
    fontSize: 12,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLOR_STYLES.defaultTheme.colorSecondary,
    borderRadius: DIMENSIONS.borderRadius.l,
    width: "80%",
    maxHeight: "60%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_STYLES.defaultTheme.colorInteractiveInactive,
  },
  selectedOption: {
    backgroundColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    color: COLOR_STYLES.defaultTheme.colorSecondary,
    fontWeight: "600",
  },
});
