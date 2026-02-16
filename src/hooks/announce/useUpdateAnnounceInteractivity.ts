import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { updateAnnounceInteractivity } from "../../services/announceService";

interface UseUpdateAnnounceInteractivityProps {
  announceId: string;
}

export const useUpdateAnnounceInteractivity = ({
  announceId,
}: UseUpdateAnnounceInteractivityProps) => {
  const { authState } = useAuth();
  const userToken = authState?.token || "";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (interactivityState: "open" | "close") =>
      updateAnnounceInteractivity(announceId, interactivityState, userToken),
    onSuccess: () => {
      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({
        queryKey: ["announce-details", announceId],
      });
      queryClient.invalidateQueries({ queryKey: ["user-announces"] });
      queryClient.invalidateQueries({ queryKey: ["found-announces"] });
      queryClient.invalidateQueries({ queryKey: ["lost-announces"] });
    },
  });
};
