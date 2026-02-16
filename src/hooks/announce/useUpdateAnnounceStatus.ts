import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { updateAnnounceStatus } from "../../services/announceService";

interface UseUpdateAnnounceStatusProps {
  announceId: string;
}

export const useUpdateAnnounceStatus = ({
  announceId,
}: UseUpdateAnnounceStatusProps) => {
  const { authState } = useAuth();
  const userToken = authState?.token || "";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (announceStatus: "solved" | "unsolved") =>
      updateAnnounceStatus(announceId, announceStatus, userToken),
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
