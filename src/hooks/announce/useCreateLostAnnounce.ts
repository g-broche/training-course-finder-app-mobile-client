import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { queryClient } from "../../core/queryClient";
import { createNewLostAnnounce } from "../../services/announceService";
import { LostItemRequest } from "../../types/request";

interface CreateLostAnnounceProps {
  data: LostItemRequest;
  image: {
    uri: string;
    type: string;
    name: string;
  } | null;
}

export const useCreateLostAnnounce = () => {
  const { authState } = useAuth();
  const accessToken = authState?.accessToken || "";

  return useMutation({
    mutationFn: ({ data, image }: CreateLostAnnounceProps) =>
      createNewLostAnnounce(data, image, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announces"],
      });
    },
  });
};
