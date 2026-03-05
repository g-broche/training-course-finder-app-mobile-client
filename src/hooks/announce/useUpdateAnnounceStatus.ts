import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnounceStatus } from "../../services/announceService";

interface UseUpdateAnnounceStatusProps {
  announceId: string;
}

export const useUpdateAnnounceStatus = ({
  announceId,
}: UseUpdateAnnounceStatusProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (announceStatus: "solved" | "unsolved") =>
      updateAnnounceStatus(announceId, announceStatus),
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
