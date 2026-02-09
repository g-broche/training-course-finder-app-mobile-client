import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLOR_STYLES } from "../../../styles/constants/colors";

interface MenuProps {
  children: ReactNode;
  style?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
}

interface ButtonPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

const MENU_WIDTH = 200;

export default function Menu({
  children,
  style,
  iconSize = 24,
  iconColor = COLOR_STYLES.defaultTheme.colorPrimary,
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition | null>(
    null,
  );
  const buttonRef = useRef<View>(null);

  const handleOpen = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setButtonPosition({
        x: x - MENU_WIDTH + width,
        y: y + height,
        width,
        height,
      });
      setIsOpen(true);
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        ref={buttonRef}
        onPress={handleOpen}
        activeOpacity={0.7}
      >
        <Ionicons name="ellipsis-vertical" size={iconSize} color={iconColor} />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <View
            style={[
              styles.menuContainer,
              buttonPosition && {
                position: "absolute",
                top: buttonPosition.y,
                left: buttonPosition.x,
              },
              style,
            ]}
          >
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                const childElement = child as React.ReactElement<{
                  onPress?: () => void;
                }>;
                return React.cloneElement(childElement, {
                  onPress: () => {
                    if (childElement.props.onPress) {
                      childElement.props.onPress();
                    }
                    handleClose();
                  },
                });
              }
              return child;
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContainer: {
    backgroundColor: COLOR_STYLES.defaultTheme.colorInteractiveActive,
    borderRadius: 8,
    width: MENU_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
