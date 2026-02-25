import { useState } from "react";
import { View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { COLOR_STYLES } from "../../styles/constants/colors";
import { DIMENSIONS } from "../../styles/constants/dimensions";
import ActionButton from "../shared/buttons/action-button";
import IconActionButton from "../shared/buttons/icon-action-button";
import UserDetailDropdown from "./user-detail-dropdown";

type HeaderUserAuthProps = {
  onSignInPress: () => void;
};

export default function HeaderUserAuth({ onSignInPress }: HeaderUserAuthProps) {
  const { authState } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!authState.authenticated) {
    return (
      <View>
        <ActionButton title="Sign in" callback={onSignInPress} />
      </View>
    );
  }

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <View>
      <IconActionButton
        iconName="person-circle-outline"
        size={DIMENSIONS.sizes.interactives.width}
        color={COLOR_STYLES.defaultTheme.colorInteractiveActive}
        callback={() => toggleDropdown()}
      />
      {authState.user !== null && showDropdown && (
        <UserDetailDropdown callback={() => closeDropdown()} />
      )}
    </View>
  );
}
