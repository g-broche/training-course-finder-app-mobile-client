import { useMutation } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: ({ data, image }: CreateLostAnnounceProps) =>
      createNewLostAnnounce(data, image),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announces"],
      });
    },
  });
};
