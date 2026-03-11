import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnounceInteractivity } from "../../services/announceService";

interface UseUpdateAnnounceInteractivityProps {
  announceId: string;
}

export const useUpdateAnnounceInteractivity = ({
  announceId,
}: UseUpdateAnnounceInteractivityProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (interactivityState: "open" | "close") =>
      updateAnnounceInteractivity(announceId, interactivityState),
    onSuccess: () => {
      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({
        queryKey: ["announces"],
      });
      queryClient.invalidateQueries({
        queryKey: ["announce-details", announceId],
      });
    },
  });
};
