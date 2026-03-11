import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../core/queryClient";
import { createNewFoundAnnounce } from "../../services/announceService";
import { FoundItemRequest } from "../../types/request";

interface CreateFoundAnnounceProps {
  data: FoundItemRequest;
  image: {
    uri: string;
    type: string;
    name: string;
  };
}

export const useCreateFoundAnnounce = () => {
  return useMutation({
    mutationFn: ({ data, image }: CreateFoundAnnounceProps) =>
      createNewFoundAnnounce(data, image),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announces"],
      });
    },
  });
};
