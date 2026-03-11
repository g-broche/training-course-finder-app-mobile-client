import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { COLOR_STYLES } from "../../styles/constants/colors";
import { DIMENSIONS } from "../../styles/constants/dimensions";
import { FONT_STYLES } from "../../styles/constants/fonts";
import DangerButton from "../shared/buttons/danger-button";

interface UserDetailDropdownProps {
  callback: () => void;
}

export default function UserDetailDropdown({
  callback,
}: UserDetailDropdownProps) {
  const { authState, onLogout } = useAuth();
  const logoutAndClose = (): void => {
    callback();
    onLogout();
  };
  return authState.user ? (
    <View style={styles.dropdown}>
      <Text style={styles.text}>{authState.user.displayName}</Text>
      <Text style={styles.text}>{authState.user.email}</Text>
      <DangerButton
        title="Logout"
        callback={() => logoutAndClose()}
      ></DangerButton>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    right: 0,
    top: DIMENSIONS.sizes.interactives.width,
    elevation: 5,
    zIndex: 10,
    shadowColor: COLOR_STYLES.defaultTheme.colorBackdrop,
    shadowOpacity: 0.6,
    shadowRadius: 4,
    borderRadius: 8,
    padding: 12,
    width: 200,
    backgroundColor: COLOR_STYLES.defaultTheme.colorTertiary,
    gap: DIMENSIONS.spacings.gaps.m,
  },
  text: {
    fontWeight: FONT_STYLES.weight.bolder,
    fontSize: FONT_STYLES.sizes.m,
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
