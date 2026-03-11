import { useEffect, useMemo, useState } from "react";
import { checkDisplayNameAvailability } from "../../services/authService";
import { debounce } from "../../utils/debounce";

export const useDisplayNameAvailability = (displayName: string) => {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  // Debounced function to check availability
  const checkAvailability = useMemo(
    () =>
      debounce(async (name: string) => {
        if (!name || name.length === 0) {
          setIsAvailable(null);
          setIsChecking(false);
          return;
        }

        setIsChecking(true);
        try {
          const available = await checkDisplayNameAvailability(name);
          setIsAvailable(available);
        } catch (error) {
          console.error("Error checking display name:", error);
          setIsAvailable(null);
        } finally {
          setIsChecking(false);
        }
      }, 500), // 500ms debounce delay
    [],
  );

  useEffect(() => {
    checkAvailability(displayName);
  }, [displayName, checkAvailability]);

  return { isAvailable, isChecking };
};
